
const students = [
  { roll: '216C1A5401', name: 'Shiva', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'  },
  { roll: '216C1A5402', name: 'Madhu', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5403', name: 'Harnadh', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5404', name: 'Ganapathi', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5405', name: 'Jagadesh', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5406', name: 'Venkatesh', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5407', name: 'Lahari', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5408', name: 'Mohan', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5409', name: 'Sagar', gender: 'Male',image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5410', name: 'Pavithra', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5411', name: 'Nagesh', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5412', name: 'Sherryl', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5413', name: 'Komali', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5414', name: 'Renuka', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5415', name: 'Durga', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5416', name: 'Geetha Mounika', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5417', name: 'Thanuja', gender: 'Female', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\G-image.jpg' },
  { roll: '216C1A5418', name: 'Hemanth', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5419', name: 'Lokesh', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
  { roll: '216C1A5420', name: 'Abhinav', gender: 'Male', image:'C:\Users\sherr\OneDrive\Desktop\Hack\scripting\Bimage.jpg'   },
];
  
  let currentIndex = 0;
  const attendance = [];
  
  
  const studentImage = document.getElementById('student-image');
  const studentName = document.getElementById('student-name');
  const studentRoll = document.getElementById('student-roll');
  const studentGender = document.getElementById('student-gender');
  const card = document.getElementById('student-card');
  
  
  function loadStudent() {
    const student = students[currentIndex];
    studentImage.src = student.image;
    studentName.textContent = student.name;
    studentRoll.textContent = student.roll;
  }
  
  
  let startX = 0;
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  card.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
  
    if (diffX > 50) {
      
      markAttendance('Present');
    } else if (diffX < -50) {
      
      markAttendance('Absent');
    }
  });
  
  
  function markAttendance(status) {
    const student = students[currentIndex];
    attendance.push({
      roll: student.roll,
      name: student.name,
      status: status,
      date: new Date().toLocaleDateString(),
    });
  
    currentIndex++;
  
    if (currentIndex < students.length) {
      loadStudent();
    } else {
      alert('Attendance complete!');
    }
  }
  
  
  document.getElementById('export-btn').addEventListener('click', () => {
    const worksheet = XLSX.utils.json_to_sheet(attendance);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, `attendance_${new Date().toISOString().slice(0, 10)}.xlsx`);
  });
  
  
  loadStudent();
  