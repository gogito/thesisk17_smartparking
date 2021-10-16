<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a id="logo" class="sidebar-brand d-flex align-items-center justify-content-center">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-location-arrow"></i>
        </div>
        <div class="sidebar-brand-text mx-3">BK Park<sup>AI</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li id="dashboard_ad" class="nav-item active">
        <a class="nav-link" href="index.php?page=db">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>


    <li id="dashboard_owner" class="nav-item active">
        <a class="nav-link" href="index.php?page=odb">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span> Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div id="manage_ad" class="sidebar-heading">
        Manage
    </div>

    <!-- Nav Item - Tables -->
    <li id="user_ad" class="nav-item">
        <a class="nav-link" href="index.php?page=us">
            <i class="fas fa-fw fa-table"></i>
            <span>Users</span></a>
    </li>

    <!-- Nav Item - Tables -->
    <li id="owner_ad" class="nav-item">
        <a class="nav-link" href="index.php?page=on">
            <i class="fas fa-fw fa-table"></i>
            <span>Owners</span></a>
    </li>

    <!-- Nav Item - Tables -->
    <li id="booking_ad" class="nav-item">
        <a class="nav-link" href="index.php?page=bk">
            <i class="fas fa-fw fa-table"></i>
            <span>Bookings</span></a>
    </li>

    <!-- Nav Item - Tables -->
    <li id="pl_ad" class="nav-item">
        <a class="nav-link" href="index.php?page=pl">
            <i class="fas fa-fw fa-table"></i>
            <span>Parking Lots</span></a>
    </li>

    <!-- Nav Item - Edge -->
    <li id="pl_ad" class="nav-item">
        <a class="nav-link" href="index.php?page=edge">
            <i class="fas fa-fw fa-table"></i>
            <span>Edge</span></a>
    </li>



    <!-- Nav Item - Tables -->
    <li id="booking_owner" class="nav-item">
        <a class="nav-link" href="index.php?page=obk">
            <i class="fas fa-fw fa-table"></i>
            <span>Bookings</span></a>
    </li>

    <!-- Nav Item - Tables -->
    <li id="pl_owner" class="nav-item">
        <a class="nav-link" href="index.php?page=opl">
            <i class="fas fa-fw fa-table"></i>
            <span>Parking Lots</span></a>
    </li>


    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

    <!-- Sidebar Message -->
    <div class="sidebar-card d-lg-flex">
        <img class="sidebar-card-illustration mb-2" src="Logo-hcmut.svg.png" alt="...">
        <p class="text-center mb-2"><strong>BKpark Android App</strong> is packed with premium features, components, and
            more!</p>
        <a class="btn btn-success btn-sm" href="apk/BKPark.apk">Download BKpark</a>
    </div>
    <script>
        var userinfo = document.getElementById("userinfo_name");
        var dashboard_ad = document.getElementById("dashboard_ad");
        var dashboard_owner = document.getElementById("dashboard_owner");
        var user_ad = document.getElementById("user_ad");
        var owner_ad = document.getElementById("owner_ad");
        var booking_ad = document.getElementById("booking_ad");
        var pl_ad = document.getElementById("pl_ad");
        var pl_owner = document.getElementById("pl_owner");
        var booking_owner = document.getElementById("booking_owner");
        var logo = document.getElementById("logo");
        var currentUserCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('currentUser='))
            .split('=')[1];
        // console.log(currentUserCookie);
        if (JSON.parse(currentUserCookie).userType == "Admin") {
            dashboard_owner.style.display = 'none';
            pl_owner.style.display = 'none';
            booking_owner.style.display = 'none';
            dashboard_ad.style.display = 'block';
            pl_ad.style.display = 'block';
            booking_ad.style.display = 'block';
            user_ad.style.display = 'block';
            owner_ad.style.display = 'block';
            logo.href = "index.php?page=db"
        } else {
            dashboard_owner.style.display = 'block';
            pl_owner.style.display = 'block';
            booking_owner.style.display = 'block';
            dashboard_ad.style.display = 'none';
            pl_ad.style.display = 'none';
            booking_ad.style.display = 'none';
            user_ad.style.display = 'none';
            owner_ad.style.display = 'none';
            logo.href = "index.php?page=odb"

        }
    </script>
</ul>