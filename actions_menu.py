import user_profile
import evaluate_class
import evaluate_teacher
import list_evaluate_class
import list_evaluate_teacher
import class_complaint_list
import teacher_complaint_list
import session

def render_interface():
    is_admin = session.user["cargo"] == "Administrador"
    options_handlers = {
        1: user_profile.render_interface,
        2: evaluate_class.render_interface,
        3: evaluate_teacher.render_interface,
        4: list_evaluate_class.render_interface,
        5: list_evaluate_teacher.render_interface,
        6: class_complaint_list.render_interface,
        7: teacher_complaint_list.render_interface,
    }

    options = [
        "Perfil",
        "Avaliar Turma",
        "Avaliar Professor",
        "Visualizar Avaliacoes de Turmas",
        "Visualizar Avaliacoes de Professores"
    ]

    if is_admin:
        options += ["Avaliar Denúncias de Turmas", "Avaliar Denúncias de Professores"]


    while True:
        option_choosed = False
        code = 0
        while not option_choosed:
            print("======================= Menu =========================")
            for i, option in enumerate(options):
                print(f"[{i + 1}] {option}")
                
            print("[-1] Sair")
            print("========================================================")
            code = int(input("R: "))

            if not is_admin and code > len(options):
                continue

            if code == -1:
                return True
            
            option_choosed =  True

        handler = options_handlers[code]
        handler()