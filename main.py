import create_user
import get_connector
import login
import actions_menu
import session

if __name__ == '__main__':
    print(session.user)
    while not session.user:
        print("======================== Menu ==========================")
        print("[1] Criar Conta")
        print("[2] Fazer Login")
        print("========================================================")
        codigo = int(input("R: "))

        if codigo == 1:
            create_user.render_interface()
        else:
            login.render_interface()
            if not session.user:
                print("Senha ou Matricula incorretos")
    
    exit = False
    while not exit:
        exit = actions_menu.render_interface()
        
    get_connector.close()