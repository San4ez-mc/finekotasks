<?php
namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\web\Response;
use yii\filters\Cors;
use app\models\LoginForm;

class AuthController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['POST', 'OPTIONS'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 3600,
                'Access-Control-Request-Headers' => ['*'],
            ],
        ];
        return $behaviors;
    }

    public function actionLogin()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $model = new LoginForm();
        $model->load(Yii::$app->request->post(), '');
        if ($model->login()) {
            return ['success' => true, 'user' => Yii::$app->user->identity];
        }
        return ['success' => false, 'errors' => $model->errors];
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();
        return ['success' => true];
    }

    public function actionTelegramLogin()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $id = Yii::$app->request->post('telegram_id');
        if (!$id) {
            return ['success' => false, 'message' => 'telegram_id required'];
        }
        $user = \app\models\User::findOne(['telegram_id' => $id]);
        if ($user) {
            Yii::$app->user->login($user, 3600 * 24 * 30);
            return ['success' => true, 'user' => $user];
        }
        return ['success' => false, 'message' => 'User not found'];
    }

}
