<?php

function createRange($arr) {
    if(is_array($arr)) {
        if(isset($arr['low']) && isset($arr['high'])) {
            return $arr['low'].'-'.$arr['high'];
        } else {
            implode('-', $arr);
        }
    } else {
        return $arr;
    }
}

function translateJSON($data) {
    preg_match_all('/\"f5\\\\?\/[a-z\|_\\\\]*\.[a-z\|_\\\\]*\"/', $data, $output_array);

    if(isset($output_array[0])) {
        foreach($output_array[0] as $match) {
            $matchClean = str_replace('\\','', str_replace('"','',$match));
            $data = str_replace($match, '"'.trans($matchClean).'"', $data);
        }
    }

    return $data;
}

