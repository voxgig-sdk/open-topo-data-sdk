package core

type OpenTopoDataError struct {
	IsOpenTopoDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenTopoDataError(code string, msg string, ctx *Context) *OpenTopoDataError {
	return &OpenTopoDataError{
		IsOpenTopoDataError: true,
		Sdk:              "OpenTopoData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenTopoDataError) Error() string {
	return e.Msg
}
