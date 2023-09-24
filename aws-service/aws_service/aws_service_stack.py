from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda,
    aws_apigateway as apigateway,    
)


TABLE_NAME = "political-party-table"
OPENAI_API_KEY = "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"
X_RAPIDAPI_KEY = "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff"
EXTRACTER_API_KEY = "418285cde14600f1a120861a1198d0dd273d7fe4"

class AwsServiceStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create Lambda Function for text processing pipeline
        text_handler_function = _lambda.Function(self, "text_function",
            runtime=_lambda.Runtime.PYTHON_3_8,
            handler="handler.textHandler",
            code=_lambda.Code.from_asset("lambda"),
            timeout=Duration.seconds(300),
            environment={
                "OPENAI_API_KEY" : OPENAI_API_KEY,
                "X_RAPIDAPI_KEY" : X_RAPIDAPI_KEY,
                "EXTRACTER_API_KEY" : EXTRACTER_API_KEY 
            }
        )

        # Create API Gateway for text processing pipeline
        api = apigateway.LambdaRestApi(self, "text_handler_api",
            handler=text_handler_function,
            proxy=False
        )

        text_resource = api.root.add_resource("text")
        text_resource.add_method("POST") # POST /text


        # Create Lambda proxy apigwv2 for API Gateway
        # text_handler_integration = apigwv2.HttpLambdaIntegration(
        #     "TextHandlerIntegration", 
        #     text_handler_function
        # )

        # # Create API Gateway for text processing pipeline
        # api = apigwv2.HttpApi(self, "TextHandlerAPI")
        # api.add_routes(
        #     path="/text",
        #     methods=[apigwv2.HttpMethod.POST],
        #     integration=text_handler_integration
        # )

        # table = dynamodb.TableV2(self, TABLE_NAME,
        #     partition_key=dynamodb.Attribute(name="id", type=dynamodb.AttributeType.STRING)
        # )

        # table.grant_read_write_data(scrape_text_function)





