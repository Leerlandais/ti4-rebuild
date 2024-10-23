
<?php
$route = $_GET['route'] ?? 'home';
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
            