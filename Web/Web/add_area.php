<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BK Parking - Add Parkinglot</title>
    <link rel="icon" href="favicon.ico?1" type="image/x-icon">
    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="js/control/add_area.js">
    </script>
    <script src="model/var.js">
    </script>
</head>

<body id="page-top" onload="updateInfo()">

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
                    <h1 class="h3 mb-2 text-gray-800">Add Areas</h1>
                    <p class="mb-4">Add New Parkinglots using the form below or download our mobile app at<a target="_blank" href="apk/BKPark.apk"> BK Parking</a>.</p>

                    <!-- Main Content -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 id="parkinglotName" class="m-0 font-weight-bold text-primary">Add Parkinglot Form</h6>
                        </div>
                        <div class="card-body">
                            <form>



                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstname">Area Name</label>
                                        <input type="text" class="form-control" id="name" placeholder="Name">
                                    </div>

                                    <div class="form-group col-md-6">
                                        <label for="inputLastname">Number of Slots</label>
                                        <input type="text" class="form-control" id="slot" placeholder="Total Slot">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputUsername4">Price(VNĐ)</label>
                                        <input type="text" class="form-control" id="price" placeholder="Price">
                                    </div>
                                </div>






                                <a onClick="addParkinglot()" type="submit" class="btn btn-primary">Add Area</a>
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
    <script>
        var ownerIDE = document.getElementById("ownerCom");
        var currentUserCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("currentUser="))
            .split("=")[1];
        console.log(JSON.parse(currentUserCookie).userType);
        if (JSON.parse(currentUserCookie).userType == "Admin") {
            ownerIDE.style.display = "block";
        } else if (JSON.parse(currentUserCookie).userType == "Owner") {
            ownerIDE.style.display = "none";
            // ownerID = JSON.parse(currentUserCookie)._id;
        }
    </script>
</body>

</html>