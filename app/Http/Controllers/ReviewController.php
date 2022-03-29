<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

    public function index(){
        $data = [];
        $data['list'] = Review::orderBy('id','DESC')->paginate(10);
        return view('sub_3',compact(['data']));
    }
    public function reviewMake(Request $request){
        $request->only(['name','contents','shop','product','score',])
    }
    public function sex($man,$woman){
        return 'baby';
    }
}
