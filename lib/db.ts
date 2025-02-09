// Financebro/lib/db.ts
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import fs from "fs";

// Log de la chaîne de connexion pour le débogage
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

// Configuration SSL en fonction de l'environnement
let sslConfig: { rejectUnauthorized: boolean; ca?: string } = { rejectUnauthorized: false };

if (process.env.NODE_ENV === "production") {
    // En production, le certificat CA doit être chargé et la vérification TLS activée.
    try {
        const caCert = fs.readFileSync("./rds-ca.pem").toString();
        sslConfig = {
            rejectUnauthorized: true,
            ca: caCert,
        };
    } catch (err) {
        console.error(
            "❌ Échec du chargement du certificat CA en production. Vérifiez que 'rds-ca.pem' existe et est valide.",
            err
        );
        throw new Error("Certificat CA requis en production");
    }
} else {
    // En développement, on tente de charger le certificat CA ; s'il est absent, on continue avec une sécurité assouplie.
    try {
        const caCert = fs.readFileSync("./rds-ca.pem").toString();
        sslConfig = {
            rejectUnauthorized: false, // sécurité assouplie en développement
            ca: caCert,
        };
    } catch (err) {
        console.warn("⚠️ 'rds-ca.pem' introuvable. Poursuite sans certificat CA en développement.");
    }
}

// Création du pool de connexions PostgreSQL avec la configuration SSL
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: sslConfig,
});

// Test immédiat de la connexion à la base de données au démarrage
async function testDatabaseConnection() {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT NOW();");
        console.log("📅 PostgreSQL server time:", res.rows[0]);
        client.release();
    } catch (error) {
        console.error("❌ Erreur de connexion à PostgreSQL:", error);
    }
}

testDatabaseConnection();

// Fonction pour créer un nouvel utilisateur dans la base de données
export async function createUser(firstName: string, email: string, password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (first_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, currency_preference, created_at",
            [firstName, email, hashedPassword]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
    }
}

// Fonction pour vérifier un mot de passe par rapport à son hash
export async function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}

// Fonction pour récupérer l'email d'un utilisateur à partir de son ID
export async function getUserByEmail(email: string) {
    try {
        const queryText = `SELECT id, email, password_hash, onboarding_completed FROM users WHERE email = $1`;
        const result = await pool.query(queryText, [email]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Failed to fetch user by email");
    }
}

export async function updateUserPassword(userId: string, hashedPassword: string) {
    try {
        await pool.query(
            "UPDATE users SET password_hash = $1 WHERE id = $2",
            [hashedPassword, userId]
        );
    } catch (error) {
        console.error("Error updating user password:", error);
        throw new Error("Error updating user password");
    }
}


// Export du pool pour pouvoir l'utiliser directement dans d'autres modules si besoin
export { pool };
