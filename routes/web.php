<?php

use App\Map;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $map = Map::all();
    if($map->count() < 1){
        $data = json_decode(file_get_contents('./resources/js/data.json'));
        forEach($data as $list){
            $input = [
                'area' => $list->area,
                'file' => $list->area.'_'.$list->most.'.jpg',
                'most' => $list->most
            ];
           \App\Area::create($input);
            forEach( $list->item as $item){
                $input = [
                    'area_id' => $list->area,
                    'item' => $item
                ];
                Map::create($input);
            }
        }
    }
    return view('index');
})->name('/');

Route::get('/event','EventController@index')->name('event');
Route::post('/event','EventController@eventMake');
Route::get('/review','ReviewController@index')->name('review');
Route::post('/review','ReviewController@reviewMake');
Route::get('/map','MapController@index')->name('map');
