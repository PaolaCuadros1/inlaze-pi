import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";
import { Favorite } from 'src/favorites/entities/favorite.entity';
@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[]
}
