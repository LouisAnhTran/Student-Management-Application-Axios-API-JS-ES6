class Student{
    constructor(id,full_name,email,phone_number,ic_number,math_score,physics_score,chemistry_score){
        this.id=id;
        this.full_name=full_name;
        this.email=email;
        this.phone_number=phone_number;
        this.ic_number=ic_number;
        this.math_score=math_score;
        this.physics_score=physics_score;
        this.chemistry_score=chemistry_score;
        this.average_score=0;
        this.level="";
    }
    calculate_average_score(){
        this.average_score=((Number(this.math_score)+Number(this.physics_score)+Number(this.chemistry_score))/3).toFixed(2);
    }
    find_acadic_performance(){
        if(this.average_score>=9){
            this.level="Excellent";
        }
        else if(this.average_score>=8){
            this.level="Good"
        }
        else if(this.average_score>=7){
            this.level="Satisfactory";
        }
        else if(this.average_score>=5){
            this.level="Acceptable";
        }
        else{
            this.level="Fail";
        }
    }
}

