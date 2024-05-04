import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"

@Entity('admin_user')
export class User {
  @ApiProperty({
    description: '用户唯一标识',
    example: '1'
  })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    description: '用户名',
    uniqueItems: true
  })
  @Column({ unique: true })
  @Unique(['username'])
  username: string

  @ApiProperty({ description: '密码' })
  @Column({ nullable: true, select: false })
  password: string

  @ApiProperty({ description: '头像' })
  @Column()
  avatar: string

  @Column()
  role: string

  @Column()
  nickname: string

  @Column()
  active: number
}