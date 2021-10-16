    <ul class="navbar-nav ml-auto">
        <!-- Nav Item - User Information -->
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span id='userinfo_name' class="mr-2 d-none d-lg-inline text-gray-600 small">Tester</span>
                <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a onclick="setInfo()" id="profile" class="dropdown-item" href="index.php?page=oi">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </a>
            </div>
        </li>
        <script>
            var userinfo = document.getElementById("userinfo_name");

            var currentUserCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('currentUser='))
                .split('=')[1];

            var userType = JSON.parse(currentUserCookie).userType;
            var profile = document.getElementById("profile");
            if (userType == "Admin") {
                profile.style.display = "none";
                userinfo.textContent = JSON.parse(currentUserCookie).name.FName + " " + JSON.parse(currentUserCookie).name.LName + " (Admin)";
            } else if (userType == "Owner") {
                profile.style.display = "block";
                userinfo.textContent = JSON.parse(currentUserCookie).name.FName + " " + JSON.parse(currentUserCookie).name.LName + " (Owner)";
                // parkinglot.value = JSON.parse(currentUserCookie).ownedParking.length;
            }
            // console.log(userinfo.textContent);


            function setInfo() {
                document.cookie = "currentUserInfo=" + JSON.parse(currentUserCookie)._id + "; max-age=3600; path=/;";
                document.cookie = "currentUserInfoType=" + JSON.parse(currentUserCookie).userType + "; max-age=3600; path=/;";
            }

            
        </script>

    </ul>