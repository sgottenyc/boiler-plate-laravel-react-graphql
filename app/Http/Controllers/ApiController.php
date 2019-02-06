<?php

namespace App\Http\Controllers;

class ApiController extends Controller
{
    public function __construct() {
        parent::__construct();
    }

    protected function response($data, $status = 200) {
        $time = microtime() - LARAVEL_START;

        return response()->json(
            'status' => $status,
            'data' => $data,
            'time' => $time
        );
    }

    protected function error($message, $status) {
        $time = microtime() - LARAVEL_START;

        return response()->json(
            'status' => $status,
            'message' => $message,
            'time' => $time
        );
    }

    protected function errorWithStatus($status, $message = null) {
        switch($status) {
            case 400:
                $message = ($message != null) ? $message: "Bad Request";
                break;
            case 401:
                $message = ($message != null) ? $message: "Unauthorized";
                break;
            case 403:
                $message = ($message != null) ? $message: "Forbidden";
                break;
            case 404:
                $message = ($message != null) ? $message: "Not found";
                break;
            case 503:
                $message = ($message != null) ? $message: "Service Unavailable";
                break;
            default:
                $message = "Internal Server Error";
                $status = 500;
                break;
        }

        return $this->error($message, $status);
    }
}
