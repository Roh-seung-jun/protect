<?php

namespace App\Http\Controllers;

use App\Area;
use App\Map;
use Illuminate\Http\Request;

class MapController extends Controller
{

    public function index(){
        $data = [
            '거제시' => Area::find('거제시'),
            '거창군' => Area::find('거창군'),
            '고성군' => Area::find('고성군'),
            '김해시' => Area::find('김해시'),
            '남해군' => Area::find('남해군'),
            '밀양시' => Area::find('밀양시'),
            '사천시' => Area::find('사천시'),
            '산청군' => Area::find('산청군'),
            '양산시' => Area::find('양산시'),
            '의령군' => Area::find('의령군'),
            '진주시' => Area::find('진주시'),
            '창녕군' => Area::find('창녕군'),
            '창원시' => Area::find('창원시'),
            '통영시' => Area::find('통영시'),
            '하동군' => Area::find('하동군'),
            '함안군' => Area::find('함안군'),
            '함양군' => Area::find('함양군'),
            '합천군' => Area::find('합천군'),
        ];
        return view('sub_1',compact(['data']));
    }
}
