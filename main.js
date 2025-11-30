//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application.
 * Generates a random list of Czech employees according to the given parameters.
 * Each employee has a Czech first name and surname (based on gender), gender, birthdate 
 * (the age is strictly between min and max) and weekly workload.
 * Age is calculated using 365.25 days per year.
 * Birthdates are guaranteed to be unique.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {

    // Czech names – separate lists for men and women
    const maleNames = ["Jiří", "Jan", "Petr", "Pavel", "Martin", "Tomáš", "Lukáš", "Ondřej", "Michal", "Josef", "Jakub", "Milan", "Václav", "David", "Adam", "Filip", "Matěj", "Daniel", "Marek", "Roman"];
    const femaleNames = ["Marie", "Jana", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Lucie", "Veronika", "Petra", "Martina", "Tereza", "Zuzana", "Monika", "Barbora", "Kristýna", "Eliška", "Adéla", "Natálie", "Klára"];
  
    const maleSurnames = ["Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Pokorný", "Krejčí", "Kovář", "Beneš", "Marek", "Hájek", "Jelínek", "Král", "Růžička", "Sedláček"];
    const femaleSurnames = ["Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová", "Pokorná", "Krejčí", "Kovářová", "Benešová", "Marková", "Hájková", "Jelínková", "Králová", "Růžičková", "Sedláčková"];
  
    const workloads = [10, 20, 30, 40];
  
    // read input values
    const count = dtoIn.count;
    const minAge = dtoIn.age.min;
    const maxAge = dtoIn.age.max;
  
    const employees = [];

    // set for already used birthdates (ensures uniqueness)
    const usedBirthdates = new Set();

    // main loop – exactly 'count' employees
    for (let i = 0; i < count; i++) {
      let gender = "";
      let firstName = "";
      let lastName = "";
      let birthdate = "";
      let workload = 0;
  
      // random gender – 50/50
      if (Math.random() < 0.5) {
        gender = "male";
      } else {
        gender = "female";
      }
  
      // choose first name based on gender
      if (gender === "male") {
        let index = Math.floor(Math.random() * maleNames.length);
        firstName = maleNames[index];
      } else {
        let index = Math.floor(Math.random() * femaleNames.length);
        firstName = femaleNames[index];
      }
  
      // choose surname based on gender
      if (gender === "male") {
        let index = Math.floor(Math.random() * maleSurnames.length);
        lastName = maleSurnames[index];
      }
      else {
        let index = Math.floor(Math.random() * femaleSurnames.length);
        lastName = femaleSurnames[index];
      }
  
      // calculate birthdate so age is exactly between minAge and maxAge
      let birthDate;
      do {
        const today = new Date();
        const daysInYear = 365.25;
        let targetAge = minAge + Math.floor(Math.random() * (maxAge - minAge + 1));
        let daysBack = Math.floor(targetAge * daysInYear);
        birthDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);
        birthDate.setUTCHours(0, 0, 0, 0);
      } 
      while (usedBirthdates.has(birthDate.toISOString().split("T")[0]));

      birthdate = birthDate.toISOString().split("T")[0];
      usedBirthdates.add(birthdate);
  
      // random workload
      let workloadIndex = Math.floor(Math.random() * workloads.length);
      workload = workloads[workloadIndex];
  
      // create employee and add it directly to result
      let employee = {
        name: firstName,
        surname: lastName,
        gender: gender,
        birthdate: birthdate,
        workload: workload
      };
      employees.push(employee);
    }
  
    // return the complete array
    return employees;
  }
  
  // test
  const testInput = {
    count: 10,
    age: { 
        min: 25, 
        max: 60 
    }
  };
  
  console.log(`Generated employees (age ${testInput.age.min}–${testInput.age.max} years old):`);
  console.table(main(testInput));