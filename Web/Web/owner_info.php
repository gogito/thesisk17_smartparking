<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BK Parking - Owner Info</title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link rel="icon" href="favicon.ico?1" type="image/x-icon">
    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="js/control/owner_info.js">
    </script>
    <!-- <script src="js/control/booking.js">
    </script> -->
    <!-- <script src="js/control/parkinglots.js">
    </script> -->
    <script src="model/var.js">
    </script>
</head>

<body id="page-top" onload="updateUserInfo()">

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
                    <h1 class="h3 mb-2 text-gray-800">Owner Info</h1>
                    <p class="mb-4">View Owner Info using the form below or download our mobile app at<a target="_blank" href="apk/BKPark.apk"> BK Parking</a>.</p>

                    <!-- Main Content -->
                    <div class="row">
                        <div class="col-xl-4 col-md-6 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Profile Picture</h6>
                                </div>
                                <div class="card-body text-center">
                                    <!-- Profile picture image-->
                                    <img class="img-account-profile rounded-circle mb-2" src="https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png" alt="">
                                    <!-- Profile picture help block-->
                                    <div id="name" class="h3 font-italic text-muted mb-4">User name</div>

                                </div>
                            </div>
                        </div>

                        <div class="col-xl-8 col-md-6 mb-4">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Account Info</h6>
                                </div>
                                <div class="card-body">
                                    <form>

                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputUsername4">Username</label>
                                                <input id='username' type="text" class="form-control" id="username" placeholder="Username" readonly>
                                            </div>
                                        </div>



                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">Email</label>
                                                <input type="email" class="form-control" id="email" placeholder="Email" readonly>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">Personal ID</label>
                                                <input type="text" class="form-control" id="personalID" placeholder="Email" readonly>
                                            </div>
                                        </div>
                                        <div id="ownerParkinglot" class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">Total parking lot</label>
                                                <input type="email" class="form-control" id="parkinglot" placeholder="Email" readonly>
                                            </div>
                                        </div>

                                </div>






                                <a id="updateBtn" href="index.php?page=uu" type="submit" class="btn btn-primary">Update</a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id="parkinglottable" class="row">
                        <div class="col-xl-12 col-md-12 mb-12">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Parkinglot Table</h6>
                                </div>
                                <div class="card-body">
                                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                        <a href="index.php?page=apl" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-plus fa-sm text-white-50"></i> Add Parkinglot</a>
                                    </div>
                                    <div class="table-responsive">
                                    <table class="table table-striped table-hover table-bordered" id="dataParkinglotTable" width="100%" cellspacing="0">
                                            <thead class = "thead-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Total Area</th>
                                                    <th>Total Slot</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tfoot class = "thead-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Total Area</th>
                                                    <th>Total Slot</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </tfoot>
                                            <tbody id='tableBodyParkingLots'>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Add Parkinglot Form</h6>
                        </div>
                        <div class="card-body">
                            <form>



                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="inputUsername4">Name</label>
                                        <input type="text" class="form-control" id="plname" placeholder="Name">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputFirstname">Latitude</label>
                                        <input type="text" class="form-control" id="pllat" placeholder="Latitude">
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="inputLastname">Longitude</label>
                                        <input type="text" class="form-control" id="pllong" placeholder="Longitude">
                                    </div>
                                </div>

                                <div class="form-row">


                                    <div class="form-group col-md-2">
                                        <label for="inputPassword4">Number</label>
                                        <input type="text" class="form-control" id="pladdress_number" placeholder="Address">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputPassword4">Street</label>
                                        <input type="text" class="form-control" id="pladdress_street" placeholder="Address">
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="inputPassword4">District</label>
                                        <input type="text" class="form-control" id="pladdress_district" placeholder="Address">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputPassword4">City</label>
                                        <input type="text" class="form-control" id="pladdress_city" placeholder="Address">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputPassword4">Country</label>
                                        <input type="text" class="form-control" id="pladdress_country" placeholder="Address">
                                    </div>
                                </div>



                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label for="inputEmail4">Thumbnail</label>
                                        <input type="email" class="form-control" id="plimg" placeholder="Thumbnail link">
                                    </div>
                                </div>






                                <a onClick="addParkinglot()" type="submit" class="btn btn-primary">Add Parking lot</a>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <!-- /.container-fluid -->

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