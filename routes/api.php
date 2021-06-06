<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "project"], function () {
    Route::get('{project_id}/graphData', [\App\Http\Controllers\Api\Project\ProjectController::class, 'graphData']);
});

Route::group(["prefix" => "user"], function () {
    Route::post('searching', [\App\Http\Controllers\Api\User\UserController::class, 'searching']);
});

