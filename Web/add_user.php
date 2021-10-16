<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico?1" type="image/x-icon">
    <title>BK Parking - Add User</title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="js/control/add_user.js">
    </script>
    <script src="model/var.js">
    </script>
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php include 'nav.php'; ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
               <?php include 'main_nav.php'; ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">Add Users</h1>
                    <p class="mb-4">Add New User using the form below or download our mobile app at<a target="_blank" href="apk/BKPark.apk"> BK Parking</a>.</p>

                    <!-- Main Content -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Add User Form</h6>
                        </div>
                        <div class="card-body">
                            <form>



                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstname">First Name</label>
                                        <input id='Fname' type="text" class="form-control" id="inputFirstname" placeholder="First Name">
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputLastname">Last Name</label>
                                        <input id='Lname' type="text" class="form-control" id="inputLastname" placeholder="Last Name">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputUsername4">Username</label>
                                        <input id='username' type="text" class="form-control" id="inputUsername4" placeholder="Username">
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Password</label>
                                        <input id='password' type="password" class="form-control" id="inputPassword4" placeholder="Password">
                                    </div>
                                </div>



                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="inputEmail4">Email</label>
                                        <input id='email' type="email" class="form-control" id="inputEmail4" placeholder="Email">
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputPersonalID">Personal ID</label>
                                        <input id='personalID' type="text" class="form-control" id="inputPersonalID" placeholder="Personal ID">
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputLicensePlate">License Plate</label>
                                        <input id='plate' type="text" class="form-control" id="inputLicensePlate" placeholder="License Plate">
                                    </div>
                                </div>






                                <a onClick="addUser()"type="submit" class="btn btn-primary">Add User</a>
                            </form>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <?php include 'footer.php'; ?>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <?php include 'logout.php'; ?>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts
    <script src="js/demo/datatables-demo.js"></script> -->

</body>

</html>