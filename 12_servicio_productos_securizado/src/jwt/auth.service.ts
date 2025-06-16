import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService, private jwtService: JwtService ) {}
  //autentica al usuario. Es decir, comprueba que es un usuario válido
   async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
        if(user){
          const valid:boolean=password.trim()==user.password;
          console.log(valid);
          //si el usuario es correcto, devolvemos un JSON
          //con sus propiedades, menos la contraseña
          
          if (valid) {
            /*const { password, ...result } = user;
            return result;*/
            const result={id:0,username:"",role:""};
            result.id=user.id;
            result.username=user.username;
            result.role=user.role;
            return result;
          }
        }
        
        return null;
  } 
  //genera el token a partir de los datos del usuario
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      valorToken: this.jwtService.sign(payload),
    };
  }
}
