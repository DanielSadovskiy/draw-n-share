const users = []

export const addUser = (id, name, room) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username is taken, try another" }
    if (!name && !room) return { error: "Please provide username and room" }
    if (!name) return { error: "Please, provide username" }
    if (!room) return { error: "Please, provide room" }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

export const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUsers = (room) => users.filter(user => user.room === room)
