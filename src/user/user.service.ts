import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  // Ajouter un utilisateur
  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      ...createUserDto,
    };

    this.users.push(user);
    return user;
  }

  // Afficher tous les utilisateurs
  findAll(): User[] {
    return this.users;
  }

  // Chercher un utilisateur par son ID
  getUserById(id: number): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${id} introuvable`);
    }

    return user;
  }

  // Modifier un utilisateur
  updateUser(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.getUserById(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  // Supprimer un utilisateur
  deleteUser(id: number) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException(`Utilisateur avec ID ${id} introuvable`);
    }

    const user = this.users[index];
    this.users.splice(index, 1);

    return {
      message: 'Utilisateur supprimé avec succès',
      user,
    };
  }
}
