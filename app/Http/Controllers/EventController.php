<?php

namespace App\Http\Controllers;

use App\Event;
use DateTime;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(){
        return view('sub_2');
    }
    public function eventMake(Request $request){
        $id = Event::find($request['phone']);
        $input = $request->only(['name','phone','score']);
        $input['date'] = date('Y-m-d');
        $input['cnt'] = 1;
        if( $id ){
            $first = new DateTime($input['date']);
            $second = new DateTime($id['date']);
            $diff = $first->diff($second);
            if($diff->d >= 2){
                $id->update($input);
                return ['이벤트 ㄳ',1];
            }else if($diff->d === 0){
                return ['중복이야',$id['cnt']];
            }else{
                $input['cnt'] += $id['cnt'];
                if($input['cnt'] === 3)return ['3일 ㅊ',3];
                $id->update($input);
                return ['이벤트 ㄳ',$id['cnt']];
            }
        }else{
            Event::create($input);
            return ['이벤트 ㄳ',1];
        }
    }
}
