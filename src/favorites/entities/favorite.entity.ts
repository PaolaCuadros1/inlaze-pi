import { Column, Entity, ManyToOne } from "typeorm";
import { User } from 'src/users/entities/user.entity'
@Entity()
export class Favorite {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    title: string;

    @Column()
    overview: string;

    @Column()
    backdrop_path: string;

    @Column()
    id_tmdb: string;

    @ManyToOne(() => User, (user) => user.id, {
        eager: true,
      })
    user: User
}
