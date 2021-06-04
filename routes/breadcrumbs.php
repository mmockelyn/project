<?php
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
    $trail->push('Tableau de Bord', route('dashboard'));
});

Breadcrumbs::for('project', function (BreadcrumbTrail $trail) {
    $trail->push('Mes Projets', route('project.index'));
});
