export const checkURLAuthorizationByRole = (pathName, userRole) => {
    if (pathName === "/patientscontrol") {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/searchpatientservice") {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }
    if (pathName === "/visitlogcontrol") {
        if (userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/createnewvisitlog") {
        if (userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/fillinvisitlogform") {
        if (userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }


    if (pathName === "/visitlogform") {
        if (userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName.includes("/visitlogform")) {
        if (userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/searchvisitlogservice") {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName.includes("/visitlogdetail")) {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/drugscontrol") {
        if (userRole === "ROLE_ADMIN") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/searchdrugservice") {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/diseasescontrol") {
        if (userRole === "ROLE_ADMIN") {
            return true;
        } else {
            return false;
        }
    }

    if (pathName === "/searchdiseaseservice") {
        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_DOCTOR" || userRole === "ROLE_NURSE") {
            return true;
        } else {
            return false;
        }
    }

    return true;
} 