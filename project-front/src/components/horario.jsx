import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import "../styles/horario.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { ok, oops, deleteConfirmation } from "../utils/Alerts";

function Horarios() {
  // Variables
  const [bloques, setBloques] = useState([]);
  const [docentes, setDocente] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedBloque, setSelectedBloque] = useState(1);
  const [aulasLabs, setAulasLabs] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState("Aula");
  const [selectedAulaLab, setSelectedAulaLab] = useState("");
  const [selectedHora, setSelectedHora] = useState("7-8");
  const [selectedDia, setSelectedDia] = useState("Lunes");
  const [selectedMateria, setSelectedMateria] = useState();
  const [selectedDocente, setSelectedDocente] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [selectedCell, setSelectedCell] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const horas = [
    "7-8",
    "8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-13",
    "13-14",
    "14-15",
    "15-16",
    "16-17",
    "17-18",
    "18-19",
    "19-20",
  ];
  const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  const formatHora = hora => {
    const [start, end] = hora.split("-");
    const startFormatted = `${start.padStart(2, "0")}:00`;
    const endFormatted = `${end.padStart(2, "0")}:00`;
    return `${startFormatted} - ${endFormatted}`;
  };

  // useEffects
  useEffect(() => {
    getDocentes();
  }, []);

  useEffect(() => {
    getMaterias();
    getBloques();
  }, []);

  useEffect(() => {
    if (selectedBloque && selectedTipo) {
      fetchAulasLabs();
    }
  }, [selectedBloque, selectedTipo]);

  useEffect(() => {
    if (selectedAulaLab) {
      getHorarios();
    }
  }, [selectedAulaLab]);

  useEffect(() => {
    if (aulasLabs.length > 0) {
      setSelectedAulaLab(aulasLabs[0].id);
    }
  }, [aulasLabs]);

  useEffect(() => {
    if (materias.length > 0 && !selectedMateria) {
      setSelectedMateria(materias[0].id);
    }
  }, [materias]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // Funciones
  const fetchAulasLabs = async () => {
    const url = `http://localhost:8080/espacio/bloque/${selectedBloque}`;

    try {
      const response = await axios.get(url);
      //Aqui se debe controlar que se llene de acuerdo al tipo
      let filteredData = [];
      if (selectedTipo == "Aula") {
        filteredData = response.data.filter(item => item.tipo === "Aula");
      } else {
        filteredData = response.data.filter(
          item => item.tipo === "Laboratorio"
        );
      }
      setAulasLabs(filteredData);
    } catch (error) {
      const { message } = error.response.data;
      if (message === "No hay espacios en este bloque") {
        oops(message);
      } else {
        oops("Error al cargar espacios");
      }
      setAulasLabs([]); // Limpia los datos si la petición falla
    }
  };

  const getHorarios = async () => {
    const url =
      selectedTipo === "Laboratorio"
        ? `http://localhost:8080/horario/lab/${selectedAulaLab}`
        : `http://localhost:8080/horario/aula/${selectedAulaLab}`;
    try {
      const response = await axios.get(url);
      setHorarios(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      oops("Error al cargar horarios.");
      setHorarios([]); // Limpia los datos si la petición falla
    }
  };

  const getMaterias = async () => {
    const url = "http://localhost:8080/materia/todos";
    try {
      const respuesta = await axios.get(url);
      setMaterias(respuesta.data);
    } catch (error) {
      oops("Error al cargar materias.");
    }
  };

  const eliminarHorario = async id => {
    const url = `http://localhost:8080/horario/${id}`;
    const isConfirmed = await deleteConfirmation();
    try {
      if (isConfirmed) {
        await axios.delete(url);
        getHorarios();
        ok("Registro eliminado exitosamente.");
      }
    } catch (error) {
      oops("No se pudo eliminar el registro. Por favor, inténtelo de nuevo.");
    }
  };

  const getDocentes = async () => {
    const url = `http://localhost:8080/person/docente`;
    try {
      const response = await axios.get(url);
      const docentesOptions = response.data.map(docente => ({
        value: docente.id,
        label: `${docente.nombre} ${docente.apellido}`,
      }));
      setDocente(docentesOptions);
    } catch (error) {
      oops("Error al cargar docentes.");
      setDocente([]);
    }
  };

  const getBloques = async () => {
    try {
      const resp = await axios.get("http://localhost:8080/bloque");
      setBloques(resp.data);
    } catch (error) {
      oops("Error al cargar bloques.");
    }
  };

  const renderTableCell = (dia, hora) => {
    const formattedHora = formatHora(hora);
    if (hora === "13-14") {
      return <td style={{ backgroundColor: "#ffcccb" }}>Receso</td>;
    }

    const horaInicio = hora.split("-")[0];
    const horario = horarios.find(h => h.dia === dia && h.hora === horaInicio);

    if (horario) {
      const [materia, profesor] = horario.nombre.split(" - ");
      return (
        <>
          {materia} - <strong>{profesor}</strong>
        </>
      );
    }

    return "";
  };

  // Handlers
  const handleDocumentClick = e => {
    if (!e.target.closest(".context-menu") && !e.target.closest("td")) {
      setSelectedCell(null);
      setShowContextMenu(false);
    }
  };

  const handleDocenteChange = selectedOption => {
    setSelectedDocente(selectedOption);
  };

  const handleBloqueChange = event => {
    setSelectedBloque(event.target.value);
  };

  const handleTipoChange = event => {
    setSelectedTipo(event.target.value);
  };

  const handleAulaLabChange = event => {
    setSelectedAulaLab(event.target.value);
  };

  const handleDeleteClick = () => {
    if (selectedCell) {
      const diaIndex = (selectedCell.cellIndex - 1 + 1) % dias.length;

      const horario = horarios.find(
        h =>
          h.dia === dias[diaIndex] &&
          h.hora.startsWith(selectedCell.rowIndex + 7 + "")
      );

      if (horario) {
        eliminarHorario(horario.id);
      }
    }
  };

  const handleCreateHorario = async () => {
    const horarioExiste = horarios.some(
      horario =>
        horario.dia === selectedDia &&
        horario.hora === selectedHora.split("-")[0]
    );
    const nada = selectedDocente.value;

    const url = "http://localhost:8080/horario";
    const nuevoHorario = {
      dia: selectedDia,
      hora: selectedHora.split("-")[0],
      id_materia: selectedMateria,
      id_persona: nada,
      id_espacio: selectedAulaLab,
    };

    try {
      if (horarioExiste) {
        oops("Ya existe un horario en el mismo día y hora");
        return;
      }

      await axios.post(url, nuevoHorario);

      ok("Registro guardado exitosamente.");

      getHorarios();
      handleCancelEdit();
    } catch (error) {
      oops("No se pudo guardar el registro. Por favor, inténtelo de nuevo.");
    }
  };

  const handleSaveChanges = async () => {
    const horarioExiste = horarios.some(
      horario =>
        horario.dia === selectedDia &&
        horario.hora === selectedHora.split("-")[0] &&
        horario.id !== selectedHorario
    );

    if (horarioExiste) {
      oops("Ya existe un horario en el mismo día y hora");
      return;
    }

    const url = `http://localhost:8080/horario`; // URL para crear o actualizar horario

    const nada = selectedDocente.value;
    const horarioActualizado = {
      id: selectedHorario, // Incluye el ID para que el backend pueda identificar si debe crear o actualizar
      dia: selectedDia,
      hora: selectedHora.split("-")[0],
      id_materia: selectedMateria,
      id_persona: nada,
      id_espacio: selectedAulaLab,
    };

    try {
      const response = await axios.post(url, horarioActualizado, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        getHorarios();
        handleCancelEdit();
        setIsEditing(false);
        setSelectedCell(null);
        ok("Registro actualizado exitosamente.");
      }
    } catch (error) {
      oops("No se pudo actualizar el registro. Por favor, inténtelo de nuevo.");
    }
  };

  const handleEditClick = () => {
    if (selectedCell) {
      const diaIndex = (selectedCell.cellIndex - 1 + 1) % dias.length;

      const horario = horarios.find(
        h =>
          h.dia === dias[diaIndex] &&
          h.hora.startsWith(selectedCell.rowIndex + 7 + "")
      );

      if (horario) {
        setSelectedDia(horario.dia);
        setSelectedHora(horario.hora + "-" + (parseInt(horario.hora) + 1)); // Ajuste para establecer la hora correctamente
        setSelectedMateria(horario.id_materia);
        const docente = docentes.find(d => d.value === horario.id_persona);
        setSelectedDocente(docente);
        setSelectedAulaLab(horario.id_espacio);
        setSelectedHorario(horario.id); // Establece el ID del horario para la edición
        setIsEditing(true);
      }
      setShowContextMenu(false);
    }
    setShowContextMenu(false);
  };

  const handleCancelEdit = () => {
    setSelectedHora("7-8");
    setSelectedDia("Lunes");
    setSelectedMateria("");
    setSelectedDocente("");
    setIsEditing(false);
    setShowContextMenu(false);
  };

  const handleCellClick = (e, rowIndex, cellIndex) => {
    setSelectedCell({ rowIndex, cellIndex });
    setContextMenuPosition({ top: e.pageY, left: e.pageX });
    setShowContextMenu(true);
  };

  // Render
  return (
    <div className="container">
      <div className="container mt-4">
        <div className="header text-center">
          <h2>Horarios</h2>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Form id="form-horarios">
              <div className="form-container">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="bloque">Bloque:</Form.Label>
                  <Form.Select
                    id="bloque"
                    className="form-control"
                    value={selectedBloque}
                    onChange={handleBloqueChange}
                  >
                    {bloques.map(bloque => (
                      <option key={bloque.id} value={bloque.id}>
                        {bloque.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-group col-md-6">
                  <Form.Label htmlFor="aula">Tipo:</Form.Label>
                  <Form.Select
                    id="aula"
                    className="form-control"
                    value={selectedTipo}
                    onChange={handleTipoChange}
                    name="aula"
                  >
                    <option value="Aula">Aulas</option>
                    <option value="Laboratorio">Laboratorios</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label htmlFor="aula-lab">Aula/Laboratorio:</Form.Label>
                  <Form.Select
                    id="aula-lab"
                    className="form-control"
                    value={selectedAulaLab}
                    onChange={handleAulaLabChange}
                    name="aulaLab"
                  >
                    {aulasLabs.map(aulaLab => (
                      <option key={aulaLab.id} value={aulaLab.id}>
                        {aulaLab.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <Button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseForm"
                aria-expanded="false"
                aria-controls="collapseForm"
                style={{
                  fontWeight: "bold",
                }}
              >
                <FaPlus style={{ marginRight: "5px" }} />
                Agregar
              </Button>
              <div className="collapse " id="collapseForm">
                <div className="form-container">
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="dia">Día:</Form.Label>
                    <Form.Select
                      id="dia"
                      className="form-control"
                      value={selectedDia}
                      onChange={e => setSelectedDia(e.target.value)}
                    >
                      <option>Lunes</option>
                      <option>Martes</option>
                      <option>Miercoles</option>
                      <option>Jueves</option>
                      <option>Viernes</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="hora">Hora:</Form.Label>
                    <Form.Select
                      id="hora"
                      className="form-control"
                      value={selectedHora}
                      onChange={e => setSelectedHora(e.target.value)}
                    >
                      {horas.map(hora => (
                        <option key={hora} value={hora}>
                          {formatHora(hora)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="materia">Materia:</Form.Label>
                    <Form.Select
                      id="materia"
                      className="form-control"
                      value={selectedMateria}
                      onChange={e => {
                        setSelectedMateria(e.target.value);
                        console.log(selectedMateria);
                      }}
                    >
                      {materias.map(materia => (
                        <option key={materia.id} value={materia.id}>
                          {materia.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="form-group docente-container me-2">
                    <Form.Label htmlFor="docente" className="me-2">
                      Docente
                    </Form.Label>
                    <div className="fixed-width-select">
                      <Select
                        value={selectedDocente}
                        onChange={handleDocenteChange}
                        options={docentes}
                        placeholder="Seleccione un docente"
                        isClearable={true}
                        isSearchable={true}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                    {docentes.map(docente => (
                      <option key={docente.id} value={docente.id}>
                        {docente.nombre}
                      </option>
                    ))}
                  </div>
                </div>
                <div className="form-container">
                  <div className="button-group mt-4 text-center">
                    {isEditing ? (
                      <>
                        <Button
                          variant="custom"
                          id="save-btn"
                          onClick={handleSaveChanges}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="custom"
                          id="cancel-btn"
                          onClick={handleCancelEdit}
                          className="ml-2"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="custom"
                        id="create-btn"
                        onClick={handleCreateHorario}
                      >
                        Crear
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Form>
            <table className="table table-bordered mt-4 table-centered">
              <thead>
                <tr>
                  <th>Horas</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                {horas.map((hora, rowIndex) => (
                  <tr key={hora}>
                    {/* Renderiza la celda de la hora con el color de fondo si es hora de receso */}
                    <td
                      style={
                        hora === "13-14"
                          ? { backgroundColor: "#ffcccb", textAlign: "center" }
                          : {}
                      }
                    >
                      {formatHora(hora)}
                    </td>
                    {dias.map((dia, cellIndex) => (
                      <td
                        key={`${dia}-${hora}`}
                        style={
                          hora === "13-14"
                            ? {
                                backgroundColor: "#ffcccb",
                                textAlign: "center",
                              }
                            : {}
                        }
                        onClick={e =>
                          hora !== "13-14" &&
                          handleCellClick(e, rowIndex, cellIndex)
                        }
                        className={
                          selectedCell &&
                          selectedCell.rowIndex === rowIndex &&
                          selectedCell.cellIndex === cellIndex
                            ? "selected"
                            : ""
                        }
                      >
                        {hora === "13-14"
                          ? "Receso"
                          : renderTableCell(dia, hora)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="context-menu"
              id="context-menu"
              style={{
                display: showContextMenu ? "block" : "none",
                top: contextMenuPosition.top,
                left: contextMenuPosition.left,
              }}
            >
              <Button
                variant="custom"
                id="editar-btn"
                onClick={handleEditClick}
              >
                Editar
              </Button>
              <Button
                variant="custom"
                id="eliminar-btn"
                onClick={handleDeleteClick}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horarios;
