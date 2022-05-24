let users = []

export const addUser = (id, name, room, password?) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username is taken, try another" }
    if (!name && !room) return { error: "Please provide username and room" }
    if (!name) return { error: "Please, provide username" }
    if (!room) return { error: "Please, provide room" }
    if(findRoom(room)?.password && findRoom(room).password !== password) return { error: "Please, provide correct password"}

    const user = { id, name, room, ...(password &&  {password}), isAdmin: !findRoom(room), isAbleToDraw: !findRoom(room)  }
    users.push(user)
    return { user }
}

export const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

export const getUserByName = name => {
    let user = users.find(user => user.name == name)
    return user
}

export const updateUserByName = (name: string, changes: any) => {
    let updatedUser = null;
    const newArr = users.map(user => {
        if (user.name === name) {
          updatedUser = {...user, ...changes};
          return {...user, ...changes};
        }
      
        return user;
    });
    users = [...newArr]
    return updatedUser;
}

export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

export const getUsers = (room) => users.filter(user => user.room === room)

export const findRoom = (room) => {
    const currRoom = users.find(user => user.room === room)
    return currRoom 
    
}
