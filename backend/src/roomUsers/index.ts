const users = []

export const addUser = (id, name, room, password?) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username is taken, try another" }
    if (!name && !room) return { error: "Please provide username and room" }
    if (!name) return { error: "Please, provide username" }
    if (!room) return { error: "Please, provide room" }
    console.log('getRoomPassword(room)', getRoomPassword(room))
    console.log('password', password)
    console.log('getRoomPassword(room) !== password', getRoomPassword(room) !== password)
    if(getRoomPassword(room) && getRoomPassword(room) !== password) return { error: "Please, provide correct password"}

    const user = { id, name, room, ...(password &&  {password}) }
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

export const getRoomPassword = (room) => {
    const currRoom = users.find(user => user.room === room)
    console.log('currRoom', currRoom)
    return currRoom ? currRoom.password || null : null
}
