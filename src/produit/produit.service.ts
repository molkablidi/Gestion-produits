import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  private produits: Produit[] = [];
  private nextId = 1;

  create(createProduitDto: CreateProduitDto) {
    const produit = {
      id: this.nextId++,
      ...createProduitDto,
    } as Produit;

    this.produits.push(produit);
    return produit;
  }

  findAll() {
    return this.produits;
  }

  findOne(id: number) {
    const produit = this.produits.find((p) => p.id === id);

    if (!produit) {
      throw new NotFoundException(`Produit avec ID ${id} introuvable`);
    }

    return produit;
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    const produit = this.findOne(id);
    Object.assign(produit, updateProduitDto);
    return produit;
  }

  remove(id: number) {
    const index = this.produits.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Produit avec ID ${id} introuvable`);
    }

    const produit = this.produits[index];
    this.produits.splice(index, 1);

    return {
      message: 'Produit supprimé avec succès',
      produit,
    };
  }
}
