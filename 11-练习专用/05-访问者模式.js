// @ts-nocheck
class Student {
  constructor(school, math, chinese) {
    this.school = school;
    this.math = math;
    this.chinese = chinese;
  }
  accept(vistor) {
    vistor.vi(this);
  }
}

class ViSchool {
  vi(orgAccept) {
    console.log(orgAccept.school);
  }
}

class ViMath {
  vi(orgAccept) {
    console.log(orgAccept.math);
  }
}

class ViChinese {
  vi(orgAccept) {
    console.log(orgAccept.chinese);
  }
}

const student = new Student("静文", "数学39分", "语文10分");
const viSchool = new ViSchool();
const viMath = new ViMath();
const viChinese = new ViChinese();

viSchool.vi(student);
viMath.vi(student);
viChinese.vi(student);
