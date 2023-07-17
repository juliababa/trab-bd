class Session:
    def __init__(self):
        self._user = {}
        
    def set_user(self, new_user: tuple[int, str, str, str, str, str]):
        self._user = {
            "matricula": new_user[0],
            "senha": new_user[1],
            "email": new_user[2],
            "curso": new_user[3],
            "cargo": new_user[4],
            "nome": new_user[5],
            "imagem": new_user[6].decode(),
        }
        
    def get_user(self) -> dict[str, int | str]:
        return self._user
    
    def get_matricula(self) -> int | None:
        value: int | str = self._user["matricula"]
        if isinstance(value, int):
            return value
    
    def update_user(self, email: str, senha: str, imagem: str) -> dict[str, str | int] | None:
        if self._user:
            self._user["email"] = email
            self._user["senha"] = senha
            self._user["imagem"] = imagem
            
        return self._user