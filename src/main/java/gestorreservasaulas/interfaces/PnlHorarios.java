package gestorreservasaulas.interfaces;

import gestorreservasaulas.entidades.Aula;
import gestorreservasaulas.entidades.Horario;
import gestorreservasaulas.entidades.Laboratorio;
import gestorreservasaulas.servicios.ServicioHorario;

import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;

import org.springframework.beans.factory.annotation.Autowired;

public class PnlHorarios extends javax.swing.JPanel {

    @Autowired
    private ServicioHorario servicioHorario;

    private Aula aula = null;
    private Laboratorio laboratorio = null;

    public PnlHorarios() {
        //Recibir un aula
        //llenar la tabla con los horario correspondiente a ese id de aula, agarrar de la lista
        initComponents();
        String[] columnNames = {"Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};


        DefaultTableModel model = new DefaultTableModel(columnNames, 0);
        for (int hour = 7; hour < 20; hour++) {
            // Formato de hora para mostrar como "7-8", "8-9", etc., sin AM/PM
            String time = String.format("%d-%d", hour, hour + 1);

            // Añadir la fila con el intervalo de tiempo
            model.addRow(new Object[]{time, "LIBRE", "LIBRE", "LIBRE", "LIBRE", "LIBRE"});
        }
        jTable1.setModel(model);
    }

    public PnlHorarios(Aula aula) {
        initComponents();
        String[] columnNames = {"Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};


        DefaultTableModel model = new DefaultTableModel(columnNames, 0);
        for (int hour = 7; hour < 20; hour++) {

            String time = String.format("%d-%d", hour, hour + 1);


            model.addRow(new Object[]{time, "LIBRE", "LIBRE", "LIBRE", "LIBRE", "LIBRE"});
        }
        jTable1.setModel(model);
        this.aula = aula;
        for (Horario horario : aula.getListaHorario()) {
            switch (horario.getDia()) {
                case "Lunes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 1);
                    break;
                case "Martes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 2);
                    break;
                case "Miercoles":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 3);
                    break;
                case "Jueves":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 4);
                    break;
                case "Viernes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 5);
                    break;

            }
        }
    }

    public PnlHorarios(Laboratorio laboratorio) {
        initComponents();
        String[] columnNames = {"Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"};

        DefaultTableModel model = new DefaultTableModel(columnNames, 0);
        for (int hour = 7; hour < 20; hour++) {

            String time = String.format("%d-%d", hour, hour + 1);


            model.addRow(new Object[]{time, "LIBRE", "LIBRE", "LIBRE", "LIBRE", "LIBRE"});
        }
        jTable1.setModel(model);
        this.laboratorio = laboratorio;
        for (Horario horario : laboratorio.getListaHorario()) {
            switch (horario.getDia()) {
                case "Lunes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 1);
                    break;
                case "Martes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 2);
                    break;
                case "Miercoles":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 3);
                    break;
                case "Jueves":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 4);
                    break;
                case "Viernes":
                    model.setValueAt(horario.getMateria(), Integer.valueOf(horario.getHora()), 5);
                    break;

            }
        }
    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jcbxdia = new javax.swing.JComboBox<>();
        jcbxhora = new javax.swing.JComboBox<>();
        jLabel5 = new javax.swing.JLabel();
        jtxtMateria = new javax.swing.JTextField();
        jButton1 = new javax.swing.JButton();
        jLabel6 = new javax.swing.JLabel();
        jButton2 = new javax.swing.JButton();
        jLabel4 = new javax.swing.JLabel();
        jComboBox3 = new javax.swing.JComboBox<>();

        setPreferredSize(new java.awt.Dimension(1030, 500));

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, false, false
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        jScrollPane1.setViewportView(jTable1);

        jLabel1.setText("AGREGAR NUEVO HORARIO");

        jLabel2.setText("DIA:");

        jLabel3.setText("HORA:");

        jcbxdia.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Lunes", "Martes", "Miercoles", "Jueves", "Viernes" }));

        jcbxhora.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "7-8", "8-9", "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20" }));

        jLabel5.setText("MATERIA");

        jtxtMateria.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jtxtMateriaActionPerformed(evt);
            }
        });

        jButton1.setText("AGREGAR!");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jLabel6.setText("ELIMINAR HORARIO");

        jButton2.setText("ELIMINAR!");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        jLabel4.setText("Horario:");

        jComboBox3.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap(48, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 982, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                        .addGroup(layout.createSequentialGroup()
                            .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 164, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGap(386, 386, 386)
                            .addComponent(jLabel6, javax.swing.GroupLayout.PREFERRED_SIZE, 164, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGroup(layout.createSequentialGroup()
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGap(41, 41, 41)
                                    .addComponent(jcbxdia, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel3)
                                    .addGap(37, 37, 37)
                                    .addComponent(jcbxhora, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addGroup(layout.createSequentialGroup()
                                    .addComponent(jLabel5)
                                    .addGap(18, 18, 18)
                                    .addComponent(jtxtMateria, javax.swing.GroupLayout.PREFERRED_SIZE, 146, javax.swing.GroupLayout.PREFERRED_SIZE)))
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                .addGroup(layout.createSequentialGroup()
                                    .addGap(387, 387, 387)
                                    .addComponent(jLabel4)
                                    .addGap(18, 18, 18)
                                    .addComponent(jComboBox3, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGroup(layout.createSequentialGroup()
                                    .addGap(33, 33, 33)
                                    .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 101, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 101, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addGap(34, 34, 34)))))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(jLabel6))
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel2)
                            .addComponent(jcbxdia, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(26, 26, 26)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel4)
                            .addComponent(jComboBox3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))))
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel3)
                            .addComponent(jcbxhora, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jButton1))
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel5)
                            .addComponent(jtxtMateria, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(29, 29, 29)
                        .addComponent(jButton2)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 325, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(23, 23, 23))
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jButton2ActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        Horario nHorario = new Horario(Long.valueOf("0"), jcbxdia.getSelectedItem().toString(), jcbxhora.getSelectedItem().toString(),
                jtxtMateria.getText(), aula, laboratorio);
        //Verificar que no se agreguen horarios para la misma hora y para el mismo dia
        if (this.servicioHorario.crearHorario(nHorario)) {
            JOptionPane.showMessageDialog(null, "Se agrego el horario");
        } else {
            JOptionPane.showMessageDialog(null, "No se puede agregar horarios existentes");
        }
    }//GEN-LAST:event_jButton1ActionPerformed

    private void jtxtMateriaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jtxtMateriaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jtxtMateriaActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JComboBox<String> jComboBox3;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTable jTable1;
    private javax.swing.JComboBox<String> jcbxdia;
    private javax.swing.JComboBox<String> jcbxhora;
    private javax.swing.JTextField jtxtMateria;
    // End of variables declaration//GEN-END:variables

}