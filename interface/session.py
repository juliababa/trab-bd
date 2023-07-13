user = None

def format_user(new_user):
    if not new_user:
        return

    return {
        "matricula": new_user[0],
        "senha": new_user[1],
        "email": new_user[2],
        "curso": new_user[3],
        "cargo": new_user[4],
        "nome": new_user[5],
    }