import User from "../models/User.js"

class UserController {
    static async getAllUsers(req, res){
        try {
          const allUsers = await User.find()
          return res.status(200).json(allUsers)  
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    
    static async GetUser(req, res) {
        try {
          const oneUser = await User.findById(req.params.id, req.body)
          return res.status(200).json(oneUser)
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
    
    static async registerUser(req, res) {
        const newUser = req.body
        try {
          const newRegisteredUser = await User.create(newUser)
          return res.status(201).json(newRegisteredUser)
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
    
    static async replaceUser(req, res) {
        try {
          const replacedUser = await User.findByIdAndUpdate(req.params.id, req.body).setOptions({ overwrite: true, new: true })
          return res.status(201).json(replacedUser)
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }

    static async updateUser(req, res) {
      try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
        return res.status(201).json(updatedUser)
      } catch (error) {
        return res.status(500).json(error.message)
      }
  }
    
    static async removeUser(req, res) {
        try {
          await User.findOneAndRemove(req.params.id)
          return res.status(200).json({ mensagem: `id ${req.params.id} has been removed` })
    
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
}

export default UserController;