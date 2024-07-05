import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["EMPLOYER"] = "EMPLOYER";
})(Role || (Role = {}));
export const Signup = async (req, res) => {
    try {
        //@ts-ignore
        const { name, email, password, role } = req.body;
        console.log({ name, email, password, role });
        // Check if the user already exists
        const isUserExist = await prisma.user.findFirst({
            where: { email },
        });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the user's password
        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                role: role,
                name,
                email,
                password,
            },
        });
        // Send a success response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};
