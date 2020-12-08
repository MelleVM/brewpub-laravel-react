<?php

use Illuminate\Support\Facades\Route;

Route::get('/insert-json-file-to-database-table', function(){
	$json = file_get_contents('https://data.opendatasoft.com/explore/dataset/open-beer-database@public-us/download/?format=json&refine.name_breweries=Rogue+Ales&refine.country=United+States&timezone=Europe/Berlin');
	$objs = json_decode($json,true);
	foreach ($objs as $obj)  {	
		foreach ($obj as $key => $value) {
			if($key == "fields") {
				$value['coordinates'] = implode(', ', $value['coordinates']);
				$insertArr[str_slug($key,'_')] = $value;
			}
		}
		DB::table('products')->insert($insertArr);
	}
	dd("Finished adding data in drinks table");
});

Route::view('/{path?}', ['app']);
Route::view('/{path?}/{path2?}', ['app']);
Route::view('/{path?}/{path2?}/{path3?}', ['app']);
Route::view('/{path?}/{path2?}/{path3?}/{path4?}', ['app']);