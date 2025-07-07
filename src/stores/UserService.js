import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./FirebaseStore";

/**
 * Serviço para manipulação de dados do usuário no Firestore
 */
const userService = {
    /**
     * Busca um usuário pelo UID
     * @param {string} uid - ID do usuário
     * @returns {Promise<Object|null>} Dados do usuário ou null se não encontrado
     */
    async getUserByUid(uid) {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return {
                    id: userSnap.id,
                    ...userSnap.data()
                };
            }
            return null;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw new Error("Não foi possível obter os dados do usuário");
        }
    },

    async getAllUsers() {
        try {
    
            // Obter todos os usuários
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            
            const users = [];
            usersSnapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            throw new Error("Não foi possível obter a lista de usuários: " + error.message);
        }
    },


    /**
     * Atualiza dados específicos do usuário
     * @param {string} uid - ID do usuário
     * @param {Object} updates - Campos para atualizar
     * @returns {Promise<void>}
     */
    async updateUser(uid, updates) {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                ...updates,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    },

    /**
     * Atualiza o telefone do usuário
     * @param {string} uid - ID do usuário
     * @param {string} phone - Novo número de telefone
     * @returns {Promise<void>}
     */
    async updateUserPhone(uid, phone) {
        return this.updateUser(uid, { phone });
    },

    /**
     * Verifica se o telefone do usuário está cadastrado
     * @param {string} uid - ID do usuário
     * @returns {Promise<boolean>}
     */
    async hasPhoneNumber(uid) {
        try {
            const user = await this.getUserByUid(uid);

            // Verifica se existe phone, não é null/undefined, não é string vazia e não é só espaços em branco
            return Boolean(
                user?.phone &&
                user.phone.trim() !== "" &&
                /[0-9]/.test(user.phone) // Verifica se tem pelo menos um número
            );
        } catch (error) {
            console.error("Erro ao verificar telefone:", error);
            return false;
        }
    }
};

export default userService;