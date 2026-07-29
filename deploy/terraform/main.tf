# AIFlow Enterprise Multi-Region Terraform Infrastructure Module
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.primary_region
}

variable "primary_region" {
  default = "us-east-1"
}

variable "secondary_regions" {
  type    = list(string)
  default = ["eu-central-1", "ap-southeast-1"]
}

resource "aws_eks_cluster" "aiflow_primary" {
  name     = "aiflow-enterprise-primary"
  role_arn = "arn:aws:iam::123456789012:role/eks-cluster-role"

  vpc_config {
    subnet_ids = ["subnet-01", "subnet-02"]
  }
}
