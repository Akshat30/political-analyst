#!/usr/bin/env python3

import aws_cdk as cdk

from aws_service.aws_service_stack import AwsServiceStack


app = cdk.App()
AwsServiceStack(app, "aws-service")

app.synth()
