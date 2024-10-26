
<?php
if(isset($_GET["route"])) {
    $route = $_GET['route'];
    switch ($route) {
        case 'home':
            echo $twig->render("public/public.index.html.twig");
            break;
        case "checkout":
            echo $twig->render("public/public.checkout.html.twig");
            break;
        default:
            echo $twig->render("err404.html.twig");
    }
}else {
    echo $twig->render("public/public.index.html.twig");
}
            