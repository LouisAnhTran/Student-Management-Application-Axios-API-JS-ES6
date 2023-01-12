let fetch_student_list_from_server_and_render = () => {
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
        method: "GET"
    }).then((res) => {
        console.log(res);
        console.log(convert_student_list(res.data));
        render_student_list(convert_student_list(res.data));
    }).catch((err) => {
        console.log(err);
        alert(err.message);
    });
}


let convert_student_list = (list_student) => {
    let converted_student_list = [];
    for (let item of list_student) {
        let std1 = new Student(item.MaSV, item.HoTen, item.Email, item.SoDT, item.CMND, item.DiemToan, item.DiemLy, item.DiemHoa);
        std1.calculate_average_score();
        std1.find_acadic_performance();
        converted_student_list.push(std1);
    }
    return converted_student_list;
}

let render_student_list = (list_student) => {
    let table_object = document.getElementById("tableDanhSach");
    let content = "";
    for (var item of list_student) {
        let new_class = ""
        if (item.level == "Excellent") {
            new_class = "warning_green";
        }
        else if (item.level == "Fail") {
            new_class = "warning_red"
        }
        else {
            new_class = "warning_medium"
        }
        content += `
        <tr class="hover_format">
                    <td>${item.id}</td>
                    <td>${item.full_name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.math_score}</td>
                    <td>${item.physics_score}</td>
                    <td>${item.chemistry_score}</td>
                    <td>${item.average_score}</td>
                    <td class="${new_class}">${item.level}</td>
                    <td>
                    <div class="d-flex">
                    <button type="button" class="btn btn-info m-1" data-toggle="modal"
                    data-target="#myModal" data_id="${item.id}" onclick=update_student(event)
                    >Update</button>

                    <button type="button" class="btn btn-danger m-1" data_id="${item.id}" onclick=delete_student(event)>Delete</button>
                    </div>
                    </td>
                  </tr>
        `;
    }
    table_object.innerHTML = content;
}


fetch_student_list_from_server_and_render();

let DomID = (id) => {
    return document.getElementById(id);
}

let add_student_to_list = () => {
    var id_val = DomID("id").value;
    var name_val = DomID("name").value;
    var email_val = DomID("email").value;
    var phone_val = DomID("phone").value;
    var ic_val = DomID("idCard").value;
    var math_val = DomID("math").value;
    var physics_val = DomID("physics").value;
    var chemistry_val = DomID("chemistry").value;

    let data = {
        "MaSV": id_val,
        "HoTen": name_val,
        "Email": email_val,
        "SoDT": phone_val,
        "CMND": ic_val,
        "DiemToan": Number(math_val),
        "DiemLy": Number(physics_val),
        "DiemHoa": Number(chemistry_val)
    }

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: data
    }).then((res) => {
        console.log(res);
        fetch_student_list_from_server_and_render();
        clear_data();
    }).catch((err) => {
        console.log(err);
        alert(`${err.code} , ${err.message},${err.response.data}`);
        clear_data();
    })

}



DomID("btnAdd").addEventListener("click", () => {
    add_student_to_list();
})

let clear_data = () => {
    DomID("id").value = "";
    DomID("name").value = "";
    DomID("email").value = "";
    DomID("phone").value = "";
    DomID("idCard").value = "";
    DomID("math").value = "";
    DomID("physics").value = "";
    DomID("chemistry").value = "";
}

DomID("btnThem").addEventListener("click", () => {
    console.log(DomID("btnUpdate").disabled);
    DomID("btnUpdate").disabled = true;
    console.log(DomID("btnUpdate").disabled);
})

let delete_student = (e) => {
    console.log(e.currentTarget.getAttribute("data_id"));

    let id = e.currentTarget.getAttribute("data_id");

    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
        method: "DELETE"
    }).then((res) => {
        console.log(res);
        fetch_student_list_from_server_and_render();
    }).catch((err) => {
        console.log(err);
    })
}


let update_student = (e) => {
    console.log(e.currentTarget.getAttribute("data_id"));
    let id = e.currentTarget.getAttribute("data_id");
    console.log(DomID("btnUpdate").disabled);
    DomID("btnUpdate").disabled = false;
    console.log(DomID("btnUpdate").disabled);

    console.log(DomID("btnAdd").disabled);
    DomID("btnAdd").disabled = true;
    console.log(DomID("btnAdd").disabled);

    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`, method: "GET"
    }).then((res) => {
        console.log(res);
        DomID("id").value = res.data.MaSV;
        DomID("id").disabled = true;
        DomID("name").value = res.data.HoTen;
        DomID("email").value = res.data.Email;
        DomID("phone").value = res.data.SoDT;
        DomID("idCard").value = res.data.CMND;
        DomID("math").value = res.data.DiemToan;
        DomID("physics").value = res.data.DiemLy;
        DomID("chemistry").value = res.data.DiemHoa;

        document.getElementById("btnUpdate").addEventListener("click", () => {
            var id_val = DomID("id").value;
            var name_val = DomID("name").value;
            var email_val = DomID("email").value;
            var phone_val = DomID("phone").value;
            var ic_val = DomID("idCard").value;
            var math_val = DomID("math").value;
            var physics_val = DomID("physics").value;
            var chemistry_val = DomID("chemistry").value;

            let data = {
                "MaSV": id_val,
                "HoTen": name_val,
                "Email": email_val,
                "SoDT": phone_val,
                "CMND": ic_val,
                "DiemToan": Number(math_val),
                "DiemLy": Number(physics_val),
                "DiemHoa": Number(chemistry_val)
            }
            axios({
                url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
                method: "PUT",
                data: data
            }).then((res) => {
                console.log(res);
                fetch_student_list_from_server_and_render();
                DomID("id").disabled = false;
                clear_data();
                console.log(DomID("btnUpdate").disabled);
                DomID("btnUpdate").disabled = false;
                console.log(DomID("btnUpdate").disabled);

                console.log(DomID("btnAdd").disabled);
                DomID("btnAdd").disabled = false;
                console.log(DomID("btnAdd").disabled);

            }).catch((err) => {
                console.log(err);
            })
        })

    }).catch((err) => {
        console.log(err);
        alert(err);
        console.log(DomID("btnUpdate").disabled);
        DomID("btnUpdate").disabled = true;
        console.log(DomID("btnUpdate").disabled);
    })
}

DomID("btnThem").addEventListener("click",()=>{
    DomID("id").disabled = false;
    clear_data();
})