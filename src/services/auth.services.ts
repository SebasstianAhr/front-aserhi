import { users } from "../core/mocks/mock-data";

interface LoginFormInputs {
    identification: string;
    password: string;
}

interface User {
    identification: string;
    email: string;
    name: string;
    lastName: string;
    rol: string;
}

export const loginService = async (data: LoginFormInputs): Promise<User> => {
    const user = users.find(
        (u) =>
            u.identification === data.identification && u.password === data.password
    );

    if (!user) {
        throw new Error("Credenciales incorrectas");
    }

    return {
        identification: user.identification,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        rol: user.rol,
    };
};


export const requestPasswordReset = async (email: string): Promise<string> => {
    const user = users.find((u) => u.email === email);
    if (!user) {
        throw new Error("El correo no está registrado.");
    }

    const resetLink = `${window.location.origin}/resetPassword/${user.identification}`;
    return resetLink;
};

export const resetPassword = async (
    identification: string,
    newPassword: string
): Promise<void> => {
    const userIndex = users.findIndex((u) => u.identification === identification);
    if (userIndex === -1) {
        throw new Error("Usuario no encontrado.");
    }

    users[userIndex].password = newPassword;
};
