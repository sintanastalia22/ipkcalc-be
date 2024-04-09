// backend/models/mahasiswa.js

const db = require('../../database/db');

class Mahasiswa {
  static async calculateIPK(nim) {
    let connection;
    try {
      // Koneksi ke database
      connection = await db.getConnection();
      
      // Query untuk menghitung IPK
      const query = `
      SELECT 
          NIM,
          SUM(CASE 
              WHEN krs.nilai >= 80 THEN 4 * mata_kuliah.sks
              WHEN krs.nilai >= 60 THEN 3 * mata_kuliah.sks
              WHEN krs.nilai >= 40 THEN 2 * mata_kuliah.sks
              ELSE 0
          END) / SUM(mata_kuliah.sks) AS ipk
      FROM 
          krs
      JOIN 
          mata_kuliah ON krs.id_mk = mata_kuliah.id_mk
      WHERE 
          NIM = ?
      GROUP BY 
          NIM;
      `;

      const [result] = await connection.query(query, [nim]);
      if (result.length === 0) {
        throw new Error('NIM yang dimasukkan salah');
      }

      // Mengembalikan hasil query
      return result[0].ipk;
    } catch (error) {
      throw error;
    } finally {
      if (connection) {
        // Pastikan untuk melepas koneksi setelah selesai
        connection.release();
      }
    }
  }
}

module.exports = Mahasiswa;
