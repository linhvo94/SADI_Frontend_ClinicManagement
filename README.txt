-- RMIT Vietnam - School of Science and Technology - SADI
-- Author: Vo Thi Cam Linh (s3655204) & Nguyen Tuan Loc (s3695769)
-- Assigment 3

SERVER: Backend: http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/
	Frontend:http://ec2-18-212-135-57.compute-1.amazonaws.com


ACCOUNT: 
	1. username: nurse 	password: nurse		role: nurse
	2. username: doctor	password: doctor	role: doctor
	3. username: admin	password: admin		role: admin
	4. usernaem: patient	password: patient 	role: patient

***Note: 
	1. If you check the back end directly (not through UI), you MUST get access token for every role (doctor, nurse, patient, admin). Normal user who does not have account will only be able to access home page and see all medical services (get all medical service function).
	2. Due to some restrictions caused by the server (such as image crash, url including hash), our website is believed to be at its best condition only when it is ran local mode. Local mode will have better redirection if an account tries to access a page which is not authorized for it.

----I. BACKEND----------------------------------------------
1/Patient
*Note: I set the Patient only can add itself
	a/Get all the patients
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients

	b/Get a patient by id
	Access roles: admin, doctor, nurse, patient 
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/{id}
			OR
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/id/{id}

	c/Delete a patient by id
	Access roles: admin 
		(DELETE) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/{id}

	d/Update patient
	Access roles: admin, doctor, nurse
		(PUT) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients

	e/Add patient
	Access roles: admin, doctor, nurse
		(POST) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients

	f/Get list patient by name 
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/name/{name}

	g/Get list patient by birthday
	Access roles: admin, doctor, nurse 
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/patients/birthday/{date}
	

2/VisitLog
	a/Get all visit
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits

	b/Delete visit by id
	Access roles: admin
		(DELETE) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/2

	c/Create new visitlog (new patient)
	Access roles: admin, doctor, nurse
		(POST) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitsByNewPatient

	d/Create new visitlog (exist patient)
	Access roles: admin, doctor, nurse
		(POST) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitsByCurrentPatient

	e/Get visit by id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/2
	
	f/Add prescription to visit
	Access roles: admin, doctor
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addprescription
	
	g/Add problem to visit
	Access roles: admin, doctor, nurse
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addproblem
	
	h/Get list visit by day
	Access roles: admin, doctor, nurse
		(GET) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/date/{date}
 
	i/Get vitsitlog of a patient's id
	Access roles: admin, doctor, nurse, patient
		(GET) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/patient/{patientID}
	
	j/Update visitlog date time
	Access roles: admin, doctor, nurse
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/editDateTime/{visitID}

	k/Update visitlog patient info(new patient)
	Access roles: admin, doctor, nurse
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/updatePatientByNewPatient/{visitID}

	l/Update visitlog patient info(exist patient)
	Access roles: admin, doctor, nurse
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/updatePatientByCurrentPatient/{visitID}

	m/Add labtests to visit
	Access roles: admin, doctor
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addLabTests/{visitID}

	n/Add diseases to visit
	Access roles: admin, doctor
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visits/addDiagnosedDiseases/{visitID}

3. Illnesses
	a/Get all illnesses
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/illnesses

	b/Add illnesses (in case new illness is found)
	Access roles: admin
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/illnesses
		
	c/Get illness by id
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/illnesses/{ilnessId} 

	d/Get illness by icd
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/findbyicd/{icd}

	e/Get illness by name
	Access roles: admin, doctor, nurse
		(GET) 	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/findbyname/{diseaseName}

	f/Delete illness
	Access roles: admin
		(DELETE) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/{id}

	g/Update illness information
	Access roles: admin
   		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diseases/{id}
		

4. Problems
	a/Get all problems
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems

	b/Add problem
	Access roles: admin, doctor, nurse
		(POST)  http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems

	c/Get problem by id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/{problemId}

	d/Get all problem by visit
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/findbyvisitID/{visitID}

	e/Update problem
	Access roles: admin, doctor, nurse
		(PUT) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/{id}

	f/Delete problem
	Access roles: admin, doctor, nurse
		(DELETE) http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/problems/{id}

5. Medicines
	a/Get all medicines
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicines
	b/Add medicine
	Access roles: admin
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicines

 	c/Get medicine by Id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicines/{medicineId}
 
	d/Update medicine
	Access roles: admin
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicines

  	e/Delete medcine
	Access roles: admin
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicines/{medicineId}
 
	f/Find medicine by name
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/drugs/findbyname/{name}

6. Prescription
	a/Get all prescription
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions

	b/Add prescription
	Access roles: admin, doctor
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions
		
 	c/Delete prescription
	Access roles: admin, doctor
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions/{prescriptionId)
	d/Update prescription
	Access roles: admin, doctor
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions

	e/Get presciption by ID
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions/{prescriptionId}
	
	f/Get all prescription by visit
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptions/findbyvisitID/{visitID}

	g/Get all prescribed medicine by prescription
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescribedDrugsInPrescription/{id}
	
7. Prescription medicine
	a/Get allprescribed medicine
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptionmedicines
 	
	b/ Add prescribed medicine
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptionmedicines
		
	c/ Get presribed medicine by Id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptionmedicines/{id}
	d/Update prescribed medicine
	Access roles: admin, doctor
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptionmedicines
		
   	e/Delete prescribed medicine
	Access roles: admin, doctor
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescriptionmedicines/{id}
  
	f/ Get all prescribed medicine by prescription
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/prescribedDrugs/findbyprescriptionID/{prescriptionID}

8. Visit Illness
	a/Update a visit_illness
	Access roles: admin, doctor
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitillnesses
		
	b/Delete
	Access roles: admin, doctor
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitillnesses/{id}
	
	c/Get all
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitillnesses

   	d/Get by Id
	Access roles: admin, doctor, nurse
   		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/visitillnesses/{id}

	e/Get all by visit
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/diagnosedDiseases/findbyvisitID/{visitID} 

9. Report
	a/Count number of patient visit by day
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/reportNumberOfVisits

	b/Count number of medicine prescribed
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/reportNumberOfDrugPrescribed

10. Lab Medical
	a/Get all lab_medical
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals

	b/Add a lab_medical
	Access roles: admin, doctor
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals

	c/Delete a lab_medical
	Access roles: admin
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals/{labMedicalID}

	d/Update a lab_medical
	Access roles: admin, doctor
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals/{labMedicalID}

	e/Find a lab_medical by id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labmedicals/findbyid/{labMedicalID}
 
11. Medical Service
	a/Get all medical service
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices

	b/Add a medical service
	Access roles: admin
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices

	c/Delete a medical service
	Access roles: admin
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices/{medicalServiceID}

	d/Update a medical service
	Access roles: admin
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices

	e/Find a medical service by id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices/findbyid/{medicalServiceID}

	f/Find a medical service by name
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/medicalservices/findbyname/{name}

12. Labtest
	a/Get all Labtest
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtest

	b/Add a Labtest
	Access roles: admin, doctor
		(POST)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtest

	c/Delete a Labtest
	Access roles: admin, doctor
		(DELETE)http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtest/{labTestID}

	d/Update a Labtest
	Access roles: admin, doctor
		(PUT)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtest

	e/Find a Labtest by id
	Access roles: admin, doctor, nurse
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/labtest/{Id}

13. User
	a/Find user by id
	Access roles: admin
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/users/findbyid/{id}

	b/Get all user
	Access roles: admin
		(GET)	http://ec2-18-212-135-57.compute-1.amazonaws.com:8080/lincol/users 

----II.FRONTEND----------------------------------------------
1. Homepage
	This is the page where everybody goes to when they access to our website (main page). From this page, users can find more information about the hospital, extra information (About Us tab) and search for Medical Services available (Services tab). But the main highlight of this page is that it is used for people who have a role in this hospital to sign in and gain rights to control information that are specifically limited based on their role. 
	Homepage: http://ec2-18-212-135-57.compute-1.amazonaws.com

2. Sign-in page
	When you click the Human icon at the top right of the page. The sign-in page will appear for the user to sign in. If the user input the wrong accoutn, there will be a message to inform the user. When the account is input rightly, the site will automatically get back to home with the account signed in. The Human icon will be replaced with the button linked to the account controll system.

3. Adminpage
	After signing in, persons with admin role will be able to access this page through the Admin System button (mentioned above). The ones with admin roles have rights to do everything (visitlog, patient, medicine,... CRUD system).
	Instruction: use account Admin to get access. When the site got back to home page after you enter the account, click the admin system at the top right corner to experience.
	
4. Doctorpage
	After signing in, persons with doctor role will be able to access this page through the Doctor System button (mentioned above). The ones with doctor roles have rights to do everything (visitlog, patient, medicine,... CRUD system).
	Instruction: use account Doctor to get access. When the site got back to home page after you enter the account, click the doctor system at the top right corner to experience.

5. Nursepage
	After signing in, persons with nurser role will be able to access this page through the Nurse System button (mentioned above). The ones with nurser role have limited rights (only view information, create patients, create basic information in visitlog). In the Nurse page, the system will automatically limit the actions.
	Instruction: use account Nurse to get access. When the site got back to home page after you enter the account, click the nurse system at the top right corner to experience.

6 Patientpage
	After signing in, persons with doctor role will be able to access this page through the Doctor System button (mentioned above). The ones with patient role will can only view information that are related to them (patient information, their visitlog information). In the Patient page, the system will automatically limit the actions.
	Instruction: use account Patient to get access. When the site got back to home page after you enter the account, click the patient system at the top right corner to experience



 


  


	
