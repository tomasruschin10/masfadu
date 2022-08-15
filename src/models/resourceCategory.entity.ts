
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Moment } from 'moment';
import { Resource } from './resource.entity';

@Entity({name:'resource_categories'})
export class ResourceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({type: "timestamp"})
  created_at: Moment

  @UpdateDateColumn({type: "timestamp", nullable: true})
  updated_at: Moment

  @OneToMany(() => Resource, resources => resources.resourceCategory ,{cascade: true})
  @JoinColumn({
      name: 'id',
      referencedColumnName: 'resource_id'
  })
  resources: Resource[];
}