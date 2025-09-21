
export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  role: string;

 
  static fromUser(user: { id: number; email: string; name: string; role: string }): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
