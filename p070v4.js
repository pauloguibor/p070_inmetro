let listCertsByCnpj = [];
var Global = {cnpj:''};
let fieldLoader = document.createElement('img');
fieldLoader.setAttribute('src','../Common/Images/v3/loading_ajax.gif');
fieldLoader.setAttribute('id', 'zeevFieldLoader');

$(document).ready(function(){
    //Se a tabela for fazia libera os campos para ser preenchidos 
	if ($("#inpDsFlowElementAlias").val() != "T01" &&  $("#tblCentrosDistribuicao tbody tr").length <= 2 && $("inp:cnpjCD").val() == "")
	{
		$('inp:cnpjCD').prop('readonly',false);
		$('inp:logradouroCD').prop('readonly',false);
		$('inp:numeroCD').prop('readonly',false);
		$('inp:complementoCD').prop('readonly',false);
		$('inp:bairroCD').prop('readonly',false);
		$('inp:municipioCD').prop('readonly',false);
		$('inp:cepCD').prop('readonly',false);
		$('inp:ufCD').prop('readonly',false);
		$('#tblCentrosDistribuicao button:not(#BtnInsertNewRow)').show();
		$('#tblCentrosDistribuicao td:nth-child(8), th:nth-child(8)').hide();
    }

	//mostra a tabela EndereÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§os Adicionais 
    // 183797 - Leandro
    if ($("#inpDsFlowElementAlias").val() == "T01") {
        hideTableCD();
		
		//Inicio alteraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes P111 2057680
		document.querySelector('[xname="inpregistrosCnpj"]').closest('table').style.display = 'none';
		//Fim alteraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes P111 2057680
		
		if ($('inp:tipoDocumento').val() == 'CNPJ'){
			ControlFields($('inp:cnpj'), 'attr', 'maxlength', 14, 0);
			ControlFields($('inp:cnpj'), 'attr', 'minlength', 14, 0);
		} else {
			ControlFields($('inp:cnpj'), 'attr', 'maxlength', 11, 0);
			ControlFields($('inp:cnpj'), 'attr', 'minlength', 11, 0);
		}
    }  

	//Esconde o botÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o excluir da tabela dos centros de distribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o
	if ($("#inpDsFlowElementAlias").val() != "T01"  && $("inp:cnpjCD").val() != "") 
	{
		$('#tblCentrosDistribuicao button:not(#BtnInsertNewRow)').hide();

		//Se campo solicitacaoNumeroRegistro for igual vazio
		//tabela para adicionar EndereÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§os Adicionais - Centros de DistribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o
		if ($("inp:solicitacaoNumeroRegistro").val() != ""){
			hideTableCD();
		}else
		{
			// Bloqueia os campos das linhas jÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡ preenchidas
			$('inp:cnpjCD').prop('readonly',true);
			$('inp:logradouroCD').prop('readonly',true);
			$('inp:numeroCD').prop('readonly',true);
			$('inp:complementoCD').prop('readonly',true);
			$('inp:bairroCD').prop('readonly',true);
			$('inp:municipioCD').prop('readonly',true);
			$('inp:cepCD').prop('readonly',true);

			// Bloqueia os selects, 
			$("inp:ufCD").css({backgroundColor:'#E8E8E8  '});
			$('inp:ufCD').find('option:not(:selected)').prop('disabled', true).hide();
		}
	}

	// Adiciona o evento de liberar o preenchimento da ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºltima linha no botÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de inserir
	// No Chrome, Mozilla
	if($('#tblCentrosDistribuicao tr:first button')[0]!=undefined)
	{
		if($('#tblCentrosDistribuicao tr:first button')[0].addEventListener){
			$('#tblCentrosDistribuicao tr:first button').click(
				function () {		
					$('inp:cnpjCD').last().prop('readonly', false);
					$('inp:logradouroCD').last().prop('readonly', false);
					$('inp:numeroCD').last().prop('readonly', false);
					$('inp:complementoCD').last().prop('readonly', false);
					$('inp:bairroCD').last().prop('readonly', false);
					$('inp:municipioCD').last().prop('readonly', false);
					$('inp:cepCD').last().prop('readonly', false);
					$('inp:ufCD').last().css({backgroundColor:'#FFFFFF'}).find('option').prop('disabled', false).show();
					$('#tblCentrosDistribuicao button:not(#BtnInsertNewRow)').last().show();
					$("inp:centroAtivo").last().hide();
				});
		}
		// No IE8
		else
		{
			$('#tblCentrosDistribuicao tr:first button')[0].attachEvent('onclick', 
				function () {
					$('inp:cnpjCD').last().prop('readonly', false);
					$('inp:logradouroCD').last().prop('readonly', false);
					$('inp:numeroCD').last().prop('readonly', false);
					$('inp:complementoCD').last().prop('readonly',true);
					$('inp:bairroCD').last().prop('readonly', false);
					$('inp:municipioCD').last().prop('readonly', false);
					$('inp:cepCD').last().prop('readonly', false);
					$('inp:cepCD').last().prop('readonly', false);
					$('inp:ufCD').last().find('option:not(:selected)').prop('disabled', false);
					$('#tblCentrosDistribuicao button:not(#BtnInsertNewRow)').last().show();
					$("inp:centroAtivo").last().hide();
			});
		}
	}

    $("inp:solicitacaoTipoImportacao").change(function(){

        if($("inp:solicitacaoTipoImportacao").find("option:selected").text() == "Produtos do programa de an\u00e1lise parametrizada")
        {           
			if($('inp:varLink').val() == ''){
                hideField('linkProcert');
            }else{
                $('[xid=divlinkProcert]').append('<a target="_blank" href="'+$('inp:varLink').val()+'">'+$('inp:varLink').val()+'</a>');
                showField('linkProcert');
            }
            $("#td0solicitacaoNumeroCertificado").css("color", "black");
            $("inp:solicitacaoNumeroCertificado")[0].setAttribute("required", "N");
        }
        else
        {
            checkCD();
         
            showOrHideTblCerProd();
        }
	    if($('inp:solicitacaoTipoImportacao').val() == 13){
	        $('#td0nomeOCP').text('Nome do laboratÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio');
	        $('#td0solicitacaoNumeroRegistro').show();
			$('#td1solicitacaoNumeroRegistro').show();
			$('inp:solicitacaoNumeroRegistro').show();
	    }else{
	        $('#td0nomeOCP').text('Nome do OCP');
	        //hideField('solicitacaoNumeroRegistro');            
	    }
    });

    //Esconde a tabela se o campo NÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero do Registro do Produto no Inmetro quando preechido
	$('inp:solicitacaoNumeroRegistro').keyup(function () {
		if($('inp:solicitacaoNumeroRegistro').val() == "" && $("inp:solicitacaoTipoImportacao").find("option:selected").val() == "14" ) 
		{
			showTableCD();
			$('#BtnSend').attr("disabled", false);
		}
		else
		{
			hideTableCD();              
		}
	});

    //Preenche o campo centro ativo com o valor sim em T01
    $('inp:cnpjCD').keyup(function(){
        if($("#inpDsFlowElementAlias").val() == "T01" || ("#inpDsFlowElementAlias").val() == "AGUARDAR_PAGAMENTO_GRU_P70") {
        	$('inp:centroAtivo').val('Sim');
        }
    });
   
    if($("inp:solicitacaoTipoImportacao").find("option:selected").text() == "Produtos registrados pelo Inmetro."){
        hideTableCD();
    }

    //----INICIO DEMANDA 89758-----------
    
    //Telefone 9 ou 8 digitos
    $('input[mask="(##) #####.####"]').blur(function () {
        
        $(this).val().length == ($(this).attr('mask').length - 1) && $(this).val().indexOf('.') === 10 ? $(this).prop('old-val', $(this).val()).val($(this).prop('old-val').substring(0, $(this).prop('old-val').indexOf('.')-1) + '.' + $(this).prop('old-val').substring($(this).prop('old-val').indexOf('.')-1).replace('.','')) : [];

    });

    //apropriacao da tarefa ao usuario que abri-la primeiro
    if($("#inpDsFlowElementAlias").val() == "T03.1" || $("#inpDsFlowElementAlias").val() == "T03.2")
    {

        if(document.forms[0].action.toLowerCase().indexOf("wfflow_execute_process.aspx") != -1) 
        {
            cryo_TaskClaimOwnershipWrapper();
            
        }
        
    }//FIM T03'S

    //----FIM DEMANDA 89758---------------

    if($("#inpDsFlowElementAlias").val() == "T01")
    {
        $("inp:destaquesNCM").closest("tr").hide();
        
        //Esconde os labels Grupo e Descricao
        //$("#td0solicitacaoNCM_desc").hide();
        //$("#td0solicitacaoGrupo").hide();
        $("inp:solicitacaoNCM_desc").closest("tr").hide();
        $("inp:solicitacaoGrupo").closest("tr").hide();
		hideField('linkProcert');
    }
    
    FieldsToHideTipoImportacao = "solicitacaoPortaria,solicitacaoNumeroCertificado,solicitacaoPropostaLaboratorio,solicitacaoDataLaboratorio,nomeOCP,numeroTermoCompromisso,dataTermoCompromisso,solicitacaoNumeroRegistro";
    //FieldsToHideTipoImportacao = "";

    let isNwBusinessRules = (
        document.querySelector('[xname=inpvarnwbusinessrules]') != null
        && document.querySelector('[xname=inpvarnwbusinessrules]') != 'undefined'
        && document.querySelector('[xname=inpvarnwbusinessrules]').value =='S');

    var alias = $("#inpDsFlowElementAlias").val();

    if(alias!="T01" && alias!="T04")
    {
        p70_HideFields(FieldsToHideTipoImportacao, false);
        FieldsToShow = $('inp:varCamposTipoImportacao').val().split(',');
        
        for(i=0;i<FieldsToShow.length;i++)
        {
            $("#td0"+FieldsToShow[i]).show();
            $("#td1"+FieldsToShow[i]).show();
            $("inp:"+FieldsToShow[i]).show();
        }
	    if($('inp:varLink').val() == ''){
            hideField('linkProcert');
        }else if(!isNwBusinessRules){
            $('[xid=divlinkProcert]').append('<a target="_blank" href="'+$('inp:varLink').val()+'">'+$('inp:varLink').val()+'</a>');
            showField('linkProcert');
        }
    }
    
    if (alias == "T01")
    {
        p70_HideFields(FieldsToHideTipoImportacao, true);
        p62_loadData();
    }
    else if(alias == "T04")
    {
        $("inp:destaquesNCM").closest("tr").hide();
        $("inp:destaquesNCM")[0].setAttribute('required', 'N');
        p70_HideFields(FieldsToHideTipoImportacao, false);
        FieldsToShow = $('inp:varCamposTipoImportacao').val().split(',');
        
        for(i=0;i<FieldsToShow.length;i++)
        {
            $("#td0"+FieldsToShow[i]).show();
            $("#td1"+FieldsToShow[i]).show();
            $("inp:"+FieldsToShow[i]).show();
        }
        
        //p70FillCombos();
    }
    
	if(alias == "T01" || alias == "T04")
	{
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv")[0].removeAttribute("onclick");
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-delete-mv")[0].removeAttribute("onclick");
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv")[0].setAttribute("onclick","InsertNewRow(this,true);maxFiveElementsTblSolicitacaoNumeroRegistro();validaTabelaRegistros();");
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-delete-mv")[0].setAttribute("onclick","DeleteRow(this);maxFiveElementsTblSolicitacaoNumeroRegistro();validaTabelaRegistros();");        
	}	
    
    if(!isNwBusinessRules)
    {
        $('#divSuggestsolicitacaoNumeroCertificado').append('<div style="color:white; background-color: red;" id="semRegistroExistente">N\u00e3o foram encontrados registros com os dados digitados</div>');
        $('inp:solicitacaoNumeroCertificado').removeAttr('onkeyup');
        $('inp:solicitacaoNumeroCertificado').prop("onkeyup", null );
        
        if($('inp:solicitacaoNumeroCertificado')[0].addEventListener){
            $('inp:solicitacaoNumeroCertificado').attr('onkeyup', 'atestadoKeyUp(this);certificadoReady(false);');
        }else{
            $('inp:solicitacaoNumeroCertificado')[0].attachEvent('onkeyup', function(){
                var valueAtestado = $('inp:solicitacaoNumeroCertificado')[0];
                var v = valueAtestado.value;
                atestadoKeyUp('inp:solicitacaoNumeroCertificado');
                certificadoReady(false);
            });
        }
    }
    else
    {
        document.querySelector('[xname=inpsolicitacaoNumeroCertificado]').setAttribute('onchange','fillProcertField(this)');
    }

    var solicitacaoText1 = 'Produtos certificados por Organismo de Avalia\u00e7\u00e3o da Conformidade (Sem registro de objeto)'
    var solicitacaoText2 = 'Produtos do programa de an\u00e1lise parametrizada'
    var solicitacao = $('inp:solicitacaoTipoImportacao').find(':selected').text();
    if(alias == 'T04' && (solicitacao == solicitacaoText1 || solicitacao == solicitacaoText1+' ' || solicitacao == solicitacaoText2 || solicitacao == solicitacaoText2+' ')){
        var cnpj = isNwBusinessRules ? $("inp:cnpj") : $('inp:cnpjcertificado').val()

        // Flag para verificar se vamos impedir ou nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o a sequÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªncia do processo
        var flagLoad = false;
        
        cnpj = cnpj.replace(/\./g,"");
        cnpj = cnpj.replace("-","");
        cnpj = cnpj.replace("/","");

        atestadoKeyUp($('inp:solicitacaoNumeroCertificado'));
        
        if(cnpj == ''){
            certificadoReady(false);
        } else if (solicitacao == solicitacaoText1 && isNwBusinessRules) {
            certificadoReady(true)
        }
        else {

            data = {
            situacao : 'Ativo',
            cpfCnpj : cnpj
            }
            //JSONP
            //Caso retorne e o json nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o possuir .Messange, significa que retornou uma lista de certificados;
            $.ajax({
               type: 'GET',
                url: '../applications/proxy.aspx?http://ws-prodcert.inmetro.gov.br/Certificado.svc/REST/ObterCertificadosPorCertificador/?callback=?',
                data: data,
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) { 
                    if(json.Message == undefined || (isIE() == true && json.Message !== null)){
                        for(var i = 0; i < json.length; i++){
                            // Se o nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero do atestado de conformidade jÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡ estiver preenchido e for vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡lido
                            if(json[i].Numero == $('inp:solicitacaoNumeroCertificado').val()){
                                flagLoad = true;

                            }
                        }
                    }
                    
                    // Se ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© um certificado vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡lido nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o bloqueia a sequÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªncia do processo
                    if(flagLoad)
                    {
                        // Remove a mensagem de obrigatoriedade do certificado
                        certificadoReady(true);
                        $('#divSuggestsolicitacaoNumeroCertificado').hide();
                        $('#divSuggestsolicitacaoNumeroCertificado a').hide();
                    }
                    else
                    {
                        // Adiciona a mensagem de obrigatoriedade do certificado
                        certificadoReady(false);
                        $('#divSuggestsolicitacaoNumeroCertificado').show();
                        $('#divSuggestsolicitacaoNumeroCertificado a').hide();
                        $('#semRegistroExistente').show();
                    }
                    
                }
            });
        }
    //$('#divSuggestsolicitacaoNumeroCertificado').hide();
    //$('#divSuggestsolicitacaoNumeroCertificado a').hide();
    }else{
        certificadoReady(true);    
    }
    
    verificaSolicitacao();
    
    Global.cnpj = $('inp:cnpjcertificado').val();
    $('inp:solicitacaoTipoImportacao').change(function(){
        $('inp:solicitacaoNumeroCertificado').val('');
		$('inp:varLink').val('');
        $('div[xid="divlinkProcert"]').find('a').remove();
        hideField('linkProcert');
        verificaSolicitacao();        
        Global.cnpj = $('inp:cnpjcertificado').val();        
    });
    $('inp:cnpjcertificado').blur(function(){
        val = $('inp:cnpjcertificado').val()
        //if(val != Global.cnpj){
        //$('inp:solicitacaoNumeroCertificado').val('');
        Global.cnpj = val;
        getRegistro();
        //}
    });

    // Demanda 474666
    /*if($('inp:solicitacaoTipoImportacao').val() == 13){
        $('#td0nomeOCP').text('Nome do laboratÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio');
        $('#td0solicitacaoNumeroRegistro').show();
        $('#td1solicitacaoNumeroRegistro').show();
        $('inp:solicitacaoNumeroRegistro').show();
        $('inp:nomeOCP').removeAttr('required');

    }else{
        $('#td0nomeOCP').text('Nome do OCP');
        //hideField('solicitacaoNumeroRegistro');
    }*/
	
    checkCD();

    //FunÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o para esconder o novo campo de link do registro se o cÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³digo atual for menor que o cÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³digo de virada.
    //Demanda: 597309.
    //Data: 04/07/2016.
    //Desenvolvedor: Igor Becker.
    fShowRegistryLink($('inp:solicitacaoNumeroRegistro'));

    $('inp:solicitacaoTipoImportacao').change(function () {
        if (this.value != '14' || this.value != '15') { p70_HideFields('linkParaRegistroDeObjeto', true); }
    });
	
	//Inicio alteraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes do P111 2057680
	showHideTblSolicitacaoNumeroRegistro();
	document.getElementById("alertaCNPJ").style.display = 'none';
	document.querySelector('[xname="inpregistrosCnpj"]').style.display = 'none';
  	//Fim alteraÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes P111 2057680      

      showOrHideTblCerProd();
      

      let fldCnpjSolicitanteP065 = document.querySelector('[xname=inpvarcnpjsolicitantep065]');
      if(fldCnpjSolicitanteP065)
        fldCnpjSolicitanteP065.style.display='none';


        let empvinculada = document.querySelector('[xname=inpempresasVinculadasRequisitante]');

        if(empvinculada){
            empvinculada.addEventListener('change',()=>{
                document.querySelector('[xname=inpsolicitacaoTipoImportacao]').value='';
                  document.querySelector('[xname=inpsolicitacaoTipoImportacao]').dispatchEvent(new Event('change'));    
              });
        }

});

function changeRadioCNPJCertificado(){
	
	$('inp:solicitacaoNumeroCertificado').val('');
	$('inp:varLink').val('');
    hideField('linkProcert');
    $('div[xid="divlinkProcert"]').find('a').remove();
	verificaSolicitacao();
	Global.cnpj = $('inp:cnpjcertificado').val();

}

//----INICIO DEMANDA 99073-----------
function verificaSolicitacao(){
    let isNwBusinessRules = (
        document.querySelector('[xname=inpvarnwbusinessrules]') != null
        && document.querySelector('[xname=inpvarnwbusinessrules]') != 'undefined'
        && document.querySelector('[xname=inpvarnwbusinessrules]').value =='S');

    var text = $('inp:solicitacaoTipoImportacao_desc').val();
    var alias = $('#inpDsFlowElementAlias').val();
    var condicao1 = 'Produtos certificados por Organismo de Avalia\u00e7\u00e3o da Conformidade (Sem registro de objeto)'
    var condicao2 = 'Produtos do programa de an\u00e1lise parametrizada'
    if(text == condicao1 ||
        text == condicao1+' ' ||
        text == condicao2 ||
        text == condicao2+' '){

            if(!isNwBusinessRules)
            {           
                showField('cnpjsolicit_da_certif');        
                showField('cnpjcertificado');

                if(alias == 'T01' ||
                   alias == 'T04'){
                   if($('input[xname="inpcnpjsolicit_da_certif"]:checked').val() == "2. N\u00e3o"){
                       $('inp:cnpjcertificado').removeAttr('readonly');
                       $('inp:cnpjcertificado').css('border-width', '2px');
                   }else{
   
                       $('input[xname="inpcnpjsolicit_da_certif"]:first').click();
   
                       $('inp:cnpjcertificado').css('border-width', '0px');
                       $('inp:cnpjcertificado').attr('readonly', true);
                       $('inp:cnpjcertificado').val($('inp:cnpj').val());
                   }                    
                   getRegistro();
                } 
            }               
    }else{
        certificadoReady(true);
        hideField('cnpjsolicit_da_certif');
        hideField('cnpjcertificado');
        if(alias == 'T01' ||
            alias == 'T04'){ 
            $('inp:cnpjcertificado').val('');
            $('inp:cnpjsolicit_da_certif').removeAttr('checked');
            $('#divSuggestsolicitacaoNumeroCertificado').hide();
        }   
    }
}

function getRegistro(){
    //if($('inp:solicitacaoNumeroCertificado').val() == ''){
        certificadoReady(false);
    //}
    $('#divSuggestsolicitacaoNumeroCertificado li').remove();
    var a = $('inp:solicitacaoNumeroCertificado');
    
    let isNwBusinessRules = (
        document.querySelector('[xname=inpvarnwbusinessrules]') != null
        && document.querySelector('[xname=inpvarnwbusinessrules]') != 'undefined'
        && document.querySelector('[xname=inpvarnwbusinessrules]').value =='S');

    var cnpj =  isNwBusinessRules 
    ? $('inp:cnpj').val()
    :  $('inp:cnpjcertificado').val();

    cnpj = cnpj.replace(/\./g,"");
    cnpj = cnpj.replace("-","");
    cnpj = cnpj.replace("/","");

    var flag = false;
    
    atestadoKeyUp(a);
    if(cnpj == ''){
        return;
    }
    data = {
    situacao : 'Ativo',
    cpfCnpj : cnpj
    }
    //JSONP
    /*Caso retorn e o json nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o possuir .Messange, ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© que retornou uma lista de certificados;*/
    $.ajax({
       type: 'GET',
        url: '../applications/proxy.aspx?http://ws-prodcert.inmetro.gov.br/Certificado.svc/REST/ObterCertificadosPorCertificador/?callback=?',
        async: false,
        data: data,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) { 
            if(json.Message == undefined){
                for(var i = 0; i < json.length; i++){

                    $('#divSuggestsolicitacaoNumeroCertificado').append('<li id="'+json[i].Numero+'" endereco="' + json[i].Endereco + '"  onclick="atestadoOnClick(this);" class="suggest_link">'+json[i].Numero+'</li>');
                    // Barranco - 09/02/2015 Se possui um certificado preenchido, valida se ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© um dos retornados. Neste caso nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o bloqueia o processo
                    if(json[i].Numero == $('inp:solicitacaoNumeroCertificado').val()){
                        flag = true;
                    }
                }
                
                // Barranco - 09/02/2015 - Se o valor preenchido ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© um certificado vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡lido, nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o bloqueia a sequÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªncia do processo
                if(flag)
                {
                    certificadoReady(true);
                    $('#divSuggestsolicitacaoNumeroCertificado').hide();
                    $('#divSuggestsolicitacaoNumeroCertificado li').hide();
                    return;
                }
                // SenÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o impede a sequÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âªncia
                else
                {
                    certificadoReady(false);
                    // Adicionando a mensagem de que nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o foram encontrados os registros
                    $('#divSuggestsolicitacaoNumeroCertificado').show();
                    $('#divSuggestsolicitacaoNumeroCertificado li').hide();
                    $('#semRegistroExistente').show();
                }
                
                //Caso seja a T01 e a pessoa tenha preenchido o campo do atestado, quando altera o programa ele corrigo a consulta.
                //atestadoKeyUp(a);
            }   
        },
        error: function(e) {
            $('#divSuggestsolicitacaoNumeroCertificado').hide();
            $('#divSuggestsolicitacaoNumeroCertificado li').hide();
            return;
        }
    });

}


function atestadoKeyUp(e){  
    var text = $(e).val();
    if(text == '' || text == undefined){
        $('#divSuggestsolicitacaoNumeroCertificado').hide();
        $('#divSuggestsolicitacaoNumeroCertificado li').hide();
		$('inp:varLink').val('');
        hideField('linkProcert');
        $('div[xid="divlinkProcert"]').find('a').remove();
        return;
    }
    var count = $('li[id*="'+text.toUpperCase()+'"]').length;
    $('#divSuggestsolicitacaoNumeroCertificado li').hide();
    $('#semRegistroExistente').hide();
    if(text.length >= 3){
         if(count > 0){
            for(var i = 0; i < count; i++){
                if(i >= 10){
                    break;
                }
                $('#divSuggestsolicitacaoNumeroCertificado').show();
                $($('li[id*="'+text.toUpperCase()+'"]')[i]).show();
                }
         }else{
            $('#semRegistroExistente').show();
            $('#divSuggestsolicitacaoNumeroCertificado').show();
            $('#divSuggestsolicitacaoNumeroCertificado li').hide();
         }
    }else{
        $('#divSuggestsolicitacaoNumeroCertificado').hide();
        $('#divSuggestsolicitacaoNumeroCertificado li').hide();
    }
    //if($('#BtnSend').val() !== undefined){
    //    $('#BtnSend').hide();
    //}
}

function atestadoOnClick(e){
    var value = $(e).text();
	var endereco = $(e).attr('endereco');
    $('inp:solicitacaoNumeroCertificado').val(value);
    $('#divSuggestsolicitacaoNumeroCertificado').hide();
    $('#divSuggestsolicitacaoNumeroCertificado li').hide();
    endereco = endereco.replace(' ','%20');
    showField('linkProcert');
    $('inp:varLink').val(endereco);
    $('div[xid="divlinkProcert"]').find('a').remove();
    $('div[xid="divlinkProcert"]').append('<a target="_blank" href='+endereco+'>'+endereco+'</a>');
    certificadoReady(true);
}

//executa no change do certificado
function certificadoReady(bool) {
    if ($("#controllers").length > 0) {
        var condicao = 'Produtos do programa de an\u00e1lise parametrizada';
        var text = $('inp:solicitacaoTipoImportacao_desc').val();
        var field = $('inp:solicitacaoNumeroCertificado').val();
        if (bool) {
            certificadoControllers("");
        }else if((text == condicao || text == condicao+' ') && field == ""){ /* CondiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o quando for analise parametrisada*/
            certificadoControllers("");
        }else{
            certificadoControllers("N\u00e3o ser\u00e1 poss\u00edvel prosseguir com a solicita\u00e7\u00e3o sem o preenchimento do n\u00famero do atestado de conformidade.");
        }
    }
}

//esconde ou mostra os botoes se o certificado permitir
function certificadoControllers(msg) {
    if (msg != "") {
        $("#controllers").hide();
        if ($("#component-tip").length > 0) {
            $("#component-tip").show();
            $("#component-tip").html(msg);
        } else {
            $("<div class=\"controlers\" id=\"component-tip\">" + msg + "</div>").insertAfter("#controllers");
        }
    } else {
        $("#component-tip").hide();     
        $("#controllers").show();
    }
}
//----FIM DEMANDA 99073-----------


function p62_showJustify() {
    if($('inp:declaracaoSolicitada').val() != undefined && $('inp:produto').val() != undefined){
        var t = cryo_GetElementByXname("inpdeclaracaoSolicitada");
        var v = t.value;
        var i = v.substring(0, v.indexOf('.'));
        var p = cryo_GetElementByXname("inpproduto");

        cryo_HideField("justificativabrinquedo");
        cryo_HideField("justificativa");
        
        if(p.value.toLowerCase()=="brinquedos" && i=="I") {
            cryo_ShowField("justificativabrinquedo");
            cryo_HideField("justificativa");
        }else if (i=="I"){
            cryo_HideField("justificativabrinquedo");   
            cryo_ShowField("justificativa");
        }
        
        cryo_GetElementByXname("inpjustificativabrinquedo").onchange = function() {
            if(this.value.toLowerCase().indexOf('outros') >=0) {
                cryo_ShowField("justificativa");    
            }else {
                cryo_GetElementByXname("inpjustificativa").value = "";
                cryo_HideField("justificativa");    
            }
        }
    }
}

function p62_loadData() {
    coduser = $('inp:codUser').val();
    codflow = $('#inpCodFlow').val();
    if(codflow != 471){
        $.ajax({
            type:'GET',
            url:'../Applications/GET_DQUAL_CLIENTES.aspx?CODFLOW='+codflow+'&CODUSER='+coduser,
            contentType:'application/xml',
            success: function(xml) {
                $('inp:razaoSocial').val($(xml).find('razaoSocial').text());
                $('inp:endereco').val($(xml).find('endereco').text());
                $('inp:numero').val($(xml).find('numero').text());
                $('inp:complemento').val($(xml).find('complemento').text());
                $('inp:bairro').val($(xml).find('bairro').text());
                $('inp:municipio').val($(xml).find('municipio').text());
                $('inp:uf').val($(xml).find('uf').text());
                $('inp:cep').val($(xml).find('cep').text());
                $('inp:telefone').val($(xml).find('telefone').text());
                $('inp:cnpj').val($(xml).find('cnpj').text());
            }
        }); 
    }
}

function p62_formataCNPJ() {
    
    var f = cryo_GetElementByXname("inpcnpj");
    var c = f.value;
    var nc = "";

    if(c.length == 14) {
        nc = c.substring(0,2) + "." + c.substring(2,5) + "." + c.substring(5,8) + "/" + c.substring(8,12) + "-" + c.substring(12,14);       
    }else {
        nc = c.substring(0,3) + "." + c.substring(3,6) + "." + c.substring(6,9) + "-" + c.substring(9,11) ;
    }
    cryo_GetElementByXname("inpcnpj").value = nc;
    //cryo_GetElementByAttribute("xid", "divcnpj").innerHTML = nc;
}

/*function p70FillCombos(){
    
    codNCM = $('inp:solicitacaoNCM').val();
    codTipoImportacao = $('inp:solicitacaoTipoImportacao_cod').val();
    
    $.post("../Applications/dipac/p70/SelectNCM_89758.aspx?inpCodNCM=" + codNCM, function(data){
        $(data).find('row').each(function(value)
        {
            if($(this).find('codtipo') && $(this).find('tipo'))
            {
                $('inp:solicitacaoTipoImportacao').append('<option value="'+$(this).find('codtipo').text()+'">'+$(this).find('tipo').text()+'</option>');
            }
        });
        
        $('inp:solicitacaoTipoImportacao').val(codTipoImportacao);
    });
    
}*/

var lastCodNCM = "";

function clickSuggest(){
    
    $(".suggest_link").unbind();
    $(".suggest_link").click(function(){
        $("inp:solicitacaoNCM").blur();
        return;
    });
}

function p70_BlurNCM(){
    
    //$('#BtnSend').attr("disabled", true);
    //$('#Button1').attr("disabled", true);
    
    clickSuggest();
    
    setTimeout(function(){
    
        codNCM = $('inp:solicitacaoNCM').val();
    
        if(codNCM.length>3 && codNCM!= lastCodNCM)
        {
            $('inp:solicitacaoNCM_desc').prop('readonly',false);
            $('inp:solicitacaoGrupo').prop('readonly',false);
            //cryo_ClearCombo(cryo_GetElementByXname("inp"+"solicitacaoTipoImportacao"));
            /*
            $('select:[xname=inpsolicitacaoTipoImportacao] option').each(function(index, option) {
                $(option).remove();
            });
            */
            
            //p70_HideFieldsTipoImportacao();
            //p70_RemoveRequiredFilesTipoImportacao();

            $.post('../Applications/dipac/p70/SelectNCM_89758.aspx?inpCodNCM=' + codNCM, function(data){
                
                if($(data).find('ncm') && $(data).find('grupo'))
                {

                    //==============================INICIO DEMANDA 76312=============Rodrigo BeirÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o 15/05/2013=================================//
                    
                    //Zera o campo 'Grupo'
                    $('inp:solicitacaoGrupo').val('');
                    $('div[xid="divsolicitacaoGrupo"]').text('');
                    $('#td1solicitacaoGrupo').css({fontWeight: 'bold'});    
                    
                    //Mostra o campo 'Grupo' e 'DescriÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o'
                    $("inp:solicitacaoNCM_desc").closest("tr").show();
                    $("inp:solicitacaoGrupo").closest("tr").show();

                    //Testa se hÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡ destaque, isso vai determinar os campos a serem preenchidos e a maneira que o campo 'Grupo' vai ser populado
                    var TemDestaque = false;

                    if($(data).find('destaque').text().length == 0) //NÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o existe Destaque
                    {
                        //O campo 'Destaques NCM' nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o aparece e nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o precisa ser preenchido
                        $("inp:destaquesNCM").closest("tr").hide();
                        $("inp:destaquesNCM")[0].setAttribute('required', 'N');
                        
                        TemDestaque = false;
                    }

                    else //Existe destaque
                    {
                        //Mostra o campo 'Destaques NCM' e torna obrigatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio o preenchimento dele
                        $("inp:destaquesNCM").closest("tr").show();
                        $("inp:destaquesNCM")[0].setAttribute('required', 'S');
                        $("#td0destaquesNCM").attr("style", "color:red")
                        TemDestaque = true;
                    }


                    if(TemDestaque)
                    {
                        
                        //Esvazia o select box
                        $("inp:destaquesNCM").empty();
                        $("inp:destaquesNCM").append('<option value="">Selecione um item</option>');
                        
                        //Preenche o select box com os destaques
                        $(data).find('destaque').each(function(){
                            $("inp:destaquesNCM").append("<option value='"+$(this).text()+"'>"+$(this).text()+"</option>");

                        }); 

                        //Remove os elementos repetidos
                        var seen = {};
                        $("inp:destaquesNCM").children().each(function() 
                        {
                            var txt = $(this).clone().wrap('<select>').parent().html();
                            if (seen[txt]){ $(this).remove(); }
                            
                            else { seen[txt] = true; }
                        });
                    }
                
                    //==============================FIM DEMANDA 76312======================================================//


                    $('inp:solicitacaoNCM_desc').val( $(data).find('ncm').first().text() );
                    $('div[xid="divsolicitacaoNCM_desc"]').text( $(data).find('ncm').first().text() );
                    $('#td1solicitacaoNCM_desc').css({fontWeight: 'bold'});
                    
                    //=========EDITADO DURANTE DEMANDA 76312 - Agora caso exista 'Destaque', o campo 'Grupo' ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© populado com o grupo do Destaque
                    if(TemDestaque)
                    {

                        $("inp:destaquesNCM").change(function(){

                            
                            //retorna o indice do destauqe na lista
                            function getIndice()
                            {
                                for(i = 0; i< $(data).find('destaque').text().length; i++)
                                {
                                    if( $($(data).find('destaque')[i]).text() == $('inp:destaquesNCM').find(":selected").text())
                                    {
                                        return i;
                                    }
                                }
                            }

                            //Modifica o valor do grupo
                            $('inp:solicitacaoGrupo').val($($(data).find('grupodestaque')[getIndice()]).text());
                            $('div[xid="divsolicitacaoGrupo"]').text($($(data).find('grupodestaque')[getIndice()]).text());
                            $('#td1solicitacaoGrupo').css({fontWeight: 'bold'});    

                        }); //fim .change
                        

                    }

                    else //Caso nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o existe Destaque o campo ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© preenchido como antigamente.
                    {
                        $('inp:solicitacaoGrupo').val( $(data).find('grupo').first().text() );
                        $('div[xid="divsolicitacaoGrupo"]').text($(data).find('grupo').first().text());
                        $('#td1solicitacaoGrupo').css({fontWeight: 'bold'});    
                    }
                }
                
                //$('inp:solicitacaoTipoImportacao').append('<option value="">Selecione um item</option>');
                /*$(data).find('row').each(function(value)
                {
                    if($(this).find('codtipo') && $(this).find('tipo').text()!="")  
                    {
                        var thing = '<option value="'+$(this).find('codtipo').text()+'">'+$(this).find('tipo').text()+'</option>'
                        
                        $('inp:solicitacaoTipoImportacao').append(thing);
                        
                    }
                });*/
                
                /*
                //REMOVE ELEMENTOS DUPLICADOS DO DROPDOWN MENU-------------------------
                var seen = {};
                $("inp:solicitacaoTipoImportacao").children().each(function() 
                {
                    var txt = $(this).clone().wrap('<select>').parent().html();
                    
                    if (seen[txt]) 
                    {
                        $(this).remove();
                        
                    } 
                    
                    else 
                    {
                        seen[txt] = true;
                    }
                
                });*/
                //------------------------------------------------------------------------
                
                
                
                
                lastCodNCM = codNCM;
                $('inp:solicitacaoNCM_desc').prop('readonly',true);
                $('inp:solicitacaoGrupo').prop('readonly',true);
                
            });
        
        }
        
        //$('#BtnSend').attr("disabled", false);
        //$('#Button1').attr("disabled", false);
        
    }, 1000);   
}
                                                                                    
var p70arquivosTipoImportacao;

// Comentar
function p70_ChangeTipoImportacao(codTipo){
    
    p70_HideFieldsTipoImportacao();
     /*
        *Inicio P111 1911294
        *RemoÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o da obrigatoriedade de inserÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de anexos

        p70_RemoveRequiredFilesTipoImportacao();

        *Fim P111 1911294
    */
    document.querySelector('[xname=inpsolicitacaoNumeroCertificado]').before(fieldLoader);

    $.post('../Applications/dipac/p70/SelectTipoImportacao.aspx?inpCodTipo=' + codTipo.value, function(data){
        
        $(data).find('row').each(function(value)
        {
            $('inp:varCamposTipoImportacao').val($(this).find('campos').text());
            p70camposTipoImportacao = $(this).find('campos').text().split(',');
            p70arquivosTipoImportacao = $(this).find('arquivos').text().split(';');
            
            if( $(this).find('arquivos').text()!="" )
            {
                $("#td0arquivosObrigatorios").show();
                $("#td1arquivosObrigatorios").show();
                $("inp:arquivosObrigatorios").show();
                $('div[xid="divarquivosObrigatorios"]').text( $(this).find('arquivos').text() );
                $('inp:arquivosObrigatorios').val( $(this).find('arquivos').text() );
                $('div[xid="divarquivosObrigatorios"]').css('color', 'red');
            }
            else
            {
                $("#td0arquivosObrigatorios").hide();
                $("#td1arquivosObrigatorios").hide();
                $("inp:arquivosObrigatorios").hide();
                $('div[xid="divarquivosObrigatorios"]').text('');
                $("inp:arquivosObrigatorios").val('');
            }
            
            for(i=0;i<p70camposTipoImportacao.length;i++)
            {
                if(+p70camposTipoImportacao[i]!="")
                {
                    $("#td0"+p70camposTipoImportacao[i]).show();
                    $("#td1"+p70camposTipoImportacao[i]).show();
                    $("inp:"+p70camposTipoImportacao[i]).show();
                    if($("inp:solicitacaoTipoImportacao").val() == '14' && p70camposTipoImportacao[i] == "solicitacaoNumeroCertificado"){

                    }else{
                        cryo_SetObjectPropertyValue(cryo_GetElementByXname("inp"+p70camposTipoImportacao[i]), "required", "S");
                    }
                    
                    //Tira a obrigatoriedade do "NÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero do Registro do Produto no Inmetro"
                    cryo_SetObjectPropertyValue(cryo_GetElementByXname("inpsolicitacaoNumeroRegistro"), "required", "N"); 
                }
            }
            
            if($("inp:solicitacaoTipoImportacao").find("option:selected").val() == "15"){
                $("inp:solicitacaoNumeroRegistro")[0].setAttribute("required", "S");  
                $("#td0solicitacaoNumeroRegistro").append('<span id="asteriscoSolicitacaoNumeroRegistro" style="color: red;"> *</span>');
            }else{
                    //Tira a obrigatoriedade do "NÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero do Registro do Produto no Inmetro"
                    cryo_SetObjectPropertyValue(cryo_GetElementByXname("inpsolicitacaoNumeroRegistro"), "required", "N"); 
                    $("#asteriscoSolicitacaoNumeroRegistro").remove();
                     showTableCD();
                }

            /*
                *Inicio P111 1911294
                *RemoÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o da obrigatoriedade de inserÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de anexos
                    for(j=0;j<p70arquivosTipoImportacao.length;j++)
                    {
                        p70_RequiredFile(p70arquivosTipoImportacao[j],'S');
                        
                    }
                *Fim P111 1911294
            */
        });

        fieldLoader.remove();
    });    
}

function p70_HideFieldsTipoImportacao(){
    
    camposTipoImportacao = $('inp:varCamposTipoImportacao').val();
    if(camposTipoImportacao!="")
    {
        p70camposTipoImportacao = camposTipoImportacao.split(',');
        for(i=0;i<p70camposTipoImportacao.length;i++)
        {
            if(p70camposTipoImportacao[i]!="")
            {
                $("#td0"+p70camposTipoImportacao[i]).hide();
                $("#td1"+p70camposTipoImportacao[i]).hide();
                $("inp:"+p70camposTipoImportacao[i]).hide();
                $("inp:"+p70camposTipoImportacao[i]).val('');
                cryo_SetObjectPropertyValue(cryo_GetElementByXname("inp"+p70camposTipoImportacao[i]), "required", "");
            }
        }
    }
}

function p70_HideFields(FieldsToHide, value){
    
    fields = FieldsToHide.split(',');
    
    for(i=0;i<fields.length;i++)
    {
        if(fields[i]!="")
        {
            $("#td0"+fields[i]).hide();
            $("#td1"+fields[i]).hide();
            $("inp:"+fields[i]).hide();
            
            if(value)
            {
                $("inp:"+fields[i]).val('');
            }
            cryo_SetObjectPropertyValue(cryo_GetElementByXname("inp"+fields[i]), "required", "");
        }
    }
}

/*
    *Inicio P111 1911294
    *RemoÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o da obrigatoriedade de inserÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de anexos     

    function p70_RemoveRequiredFilesTipoImportacao(){
        
        if($.isArray(p70arquivosTipoImportacao))
        { 
            for(i=0;i<p70arquivosTipoImportacao.length;i++)
            { 
                p70_RequiredFile(p70arquivosTipoImportacao[i],'N'); 
            } 
        }
    }

    function p70_RequiredFile(fileName, required)
    {
        
        fileList = document.getElementById("inp"+"DsFileList");
        if(required.toUpperCase()=='S')
        {
            fileList.value = fileName;
        }
        else
        {
            fileList.value = "";
        }
    }
    *Fim P111 1911294
*/

function getSelectedText(select,idCampoTexto){ 
    
    $("inp:"+idCampoTexto).val(select.children("option:selected").text()); 
}

function getSelectedValue(select,idCampoCodigo){ 
    
    $("inp:"+idCampoCodigo).val(select.children("option:selected").val()); 
}

function demanda256603()
{
    /*
    $("inp:solicitacaoTipoImportacao").change(function(){

        if($("inp:solicitacaoTipoImportacao").find("option:selected").text() == "Produtos do programa de an\u00e1lise parametrizada")
        {           
            $("inp:LIsubstituitiva")[0].setAttribute("required", "");
            $("inp:LIsubstituitiva").hide();
        }

        else
        {
            $("inp:LIsubstituitiva")[0].setAttribute("required", "");
            $("inp:LIsubstituitiva").show();
        }

    });
    */
}

function showField(id){
    //Pega ID e com ele mostra as td's desse campo e coloca a obrigatoriedade
    $('#td0'+id).show();
    $('#td1'+id).show();
    $('inp:'+id)[0].setAttribute('required','S');
}

function hideField(id){
    //Pega ID e com ele esconde as td's desse campo e retira a obrigatoriedade
    $('#td0'+id).hide();
    $('#td1'+id).hide();
    $('inp:'+id)[0].setAttribute('required','N');
}

function changeHiddenField(id)
{
    $("div[xid='div"+id+"']").text( $("inp:"+id).val() );
    $("div[xid='div"+id+"']").css("fontWeight", "bold");
}

function isIE(){
    
    var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        ms_ie = true;
    }

    if ( ms_ie ) {
        return true;
    }
    else
    {
        return false;
    }
}

////Mostra a tabela e atribui a obrigatoriedade
//183797 - Leandro 
function checkCD(){
	
	if($('#inpDsFlowEelementAlias').val()=="T01" || $('#inpDsFlowEelementAlias').val()=="T04")
	{
		if($("inp:solicitacaoTipoImportacao").find("option:selected").text() == "Produtos do programa de an\u00e1lise parametrizada"  || $("inp:solicitacaoTipoImportacao").find("option:selected").text() == "Produtos registrados pelo Inmetro.")
		{
			hideTableCD();
		}
		else
		{
			showTableCD();
		}
	}
	else
	{
		if(($("inp:solicitacaoTipoImportacao").val() == 14 && $('inp:solicitacaoNumeroRegistro').val() != "") || 
			$("inp:solicitacaoTipoImportacao").val() == 15)
		{
			hideTableCD();
		}
		else
		{
			showTableCD();
		}
	}
}

function showTableCD(){
    $('#tblCentrosDistribuicao').show();
    $('#BtnInsertNewRow').prop('disabled',false);
    $('#tblCentrosDistribuicao button:not(#BtnInsertNewRow)').prop('disabled',false);
    $("table[id='EndereÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§o eletrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´nico prÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³prio de venda na internet']").show();
    $("#divInfoCD").show();
}

function hideTableCD(){
    $('#tblCentrosDistribuicao').hide();
    $("table[id='EndereÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§o eletrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â´nico prÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³prio de venda na internet']").hide();
    $("#divInfoCD").hide();

}

function blurCnpjCd(objCnpjCD){
	
	// Valor do campo cnpjCD que disparou o evento
	cnpjCD = $(objCnpjCD).val();
	
	// CNPJ invÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡lido
	if(!isValidCnpjCD(objCnpjCD.val())){
		
		// Se nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o for vazio
		if(objCnpjCD.val()!='')
		{
			alert("O CNPJ inserido ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© inv\u00e1lido!");
			
			// Limpa o valor do CNPJ
			objCnpjCD.val('');
		}
		
		// Se o CNPJ NÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢O possuir valor, centro ativo deve ficar vazio.		
		// Limpa o input ou select-one
		$(objCnpjCD).parent('td').parent('tr').find(':input[xname="inpcentroAtivo"]').val('');
		
		// Remove a obrigatoriedade dos campos do centro de distribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o da mesma linha do cnpj
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inplogradouroCD"]')[0].setAttribute('required','N');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpnumeroCD"]')[0].setAttribute('required','N');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpbairroCD"]')[0].setAttribute('required','N');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpmunicipioCD"]')[0].setAttribute('required','N');
		$(objCnpjCD).parent('td').parent('tr').find('select[xname="inpufCD"]')[0].setAttribute('required','N');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpcepCD"]')[0].setAttribute('required','N');
	}
	// CNPJ ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© vÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡lido e tem valor
	else
	{	
		// Se o CNPJ possuir valor, entao o campo centro ativo daquela linha deve ser igual sim.
		// Preenche o input ou select-one
		$(objCnpjCD).parent('td').parent('tr').find(':input[xname="inpcentroAtivo"]').val('Sim');
		
		// Adiciona a obrigatoriedade dos campos do centro de distribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o da mesma linha do cnpj
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inplogradouroCD"]')[0].setAttribute('required','S');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpnumeroCD"]')[0].setAttribute('required','S');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpbairroCD"]')[0].setAttribute('required','S');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpmunicipioCD"]')[0].setAttribute('required','S');
		$(objCnpjCD).parent('td').parent('tr').find('select[xname="inpufCD"]')[0].setAttribute('required','S');
		$(objCnpjCD).parent('td').parent('tr').find('input[xname="inpcepCD"]')[0].setAttribute('required','S');
	}
}

// Usado para validar o CNPJ dos centros de distribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o
function isValidCnpjCD(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
}



//Regra de implementaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de link do Registro
//Se o valor do tipo de importaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o = 14: entÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o o nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero de registro nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© obrigatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio, mas se o nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero de registro for preenchido gera link, caso contrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡rio nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o.
//Se o valor do tipo de importaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o = 15: entÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o o nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âºmero de registro ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© obrigatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio e gera o link.
//Demanda: 597309.
//Data: 04/07/2016.
//ModificaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o: 23/09/2016
//Desenvolvedor: Igor Becker.
//Alterada em 13/12/2021 P111 - 2057680
function fShowRegistryLink(obj) {
	if(obj.length > 0)
	{
		for(i=0;i < obj.length; i++)
		{
			switch ($("#inpDsFlowElementAlias").val()) {
				case "T01":
					if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15')
					{
						if (obj[i].value != '' && obj[i].value.length > 10)
						{
							$($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
							var numRegistro = obj[i].value.replace('/', '%2F');
							$($(obj[i]).closest('tr').find('td')[2]).find('input').val('');
							$($(obj[i]).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
							$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
							$($(obj[i]).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '</a>');
						}
						else
						{
							$($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
							$($(obj[i]).closest('tr').find('td')[2]).find('input').val(''); 
							$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
						}
					}
					break;
				case "T04":
					if (parseFloat($('#inpCodFlowExecute').val()) > parseFloat(ultimaInstancia))
					{
						if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15')
						{
							if (obj[i].value != '' && obj[i].value.length > 10)
							{
								$($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
								var numRegistro = obj[i].value.replace('/', '%2F');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
								$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
								$($(obj[i]).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '</a>');
							}
							else
							{
								$($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
							}
						}
					}
					break;
				default:
					if (parseFloat($('#inpCodFlowExecute').val()) > parseFloat(ultimaInstancia)) {
						if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15') {
							if (obj[i].value != '' && obj[i].value.length > 10) {
							   $($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
								var numRegistro = obj[i].value.replace('/', '%2F');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
								$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
								$($(obj[i]).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj[i]).closest('tr').find('td')[2]).find('input').val() + '</a>');
							}
							else {
								$($(obj[i]).closest('tr').find('td')[2]).find('a').remove();
								$($(obj[i]).closest('tr').find('td')[2]).find('input').val('');
								$($(obj[i]).closest('tr').find('td')[2]).find('input').hide();
							}
						}
					}
					break;
			}
		}
	}
	else
	{
		switch ($("#inpDsFlowElementAlias").val()) {
			case "T01":
				if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15')
				{
					if (obj.value != '' && obj.value.length > 10)
					{
						$($(obj).closest('tr').find('td')[2]).find('a').remove();
						var numRegistro = obj.value.replace('/', '%2F');
						$($(obj).closest('tr').find('td')[2]).find('input').val('');
						$($(obj).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
						$($(obj).closest('tr').find('td')[2]).find('input').hide();
						$($(obj).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '</a>');
					}
					else
					{
						$($(obj).closest('tr').find('td')[2]).find('a').remove();
						$($(obj).closest('tr').find('td')[2]).find('input').val(''); 
						$($(obj).closest('tr').find('td')[2]).find('input').hide();
					}
				}
				break;
			case "T04":
				if (parseFloat($('#inpCodFlowExecute').val()) > parseFloat(ultimaInstancia))
				{
					if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15')
					{
						if (obj.value != '' && obj.value.length > 10)
						{
							$($(obj).closest('tr').find('td')[2]).find('a').remove();
							var numRegistro = obj.value.replace('/', '%2F');
							$($(obj).closest('tr').find('td')[2]).find('input').val('');
							$($(obj).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
							$($(obj).closest('tr').find('td')[2]).find('input').hide();
							$($(obj).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '</a>');
						}
						else
						{
							$($(obj).closest('tr').find('td')[2]).find('a').remove();
							$($(obj).closest('tr').find('td')[2]).find('input').val('');
							$($(obj).closest('tr').find('td')[2]).find('input').hide();
						}
					}
				}
				break;
			default:
				if (parseFloat($('#inpCodFlowExecute').val()) > parseFloat(ultimaInstancia)) {
					if ($('inp:solicitacaoTipoImportacao').val() == '14' || $('inp:solicitacaoTipoImportacao').val() == '15') {
						if (obj.value != '' && obj.value.length > 10) {
						   $($(obj).closest('tr').find('td')[2]).find('a').remove();
							var numRegistro = obj.value.replace('/', '%2F');
							$($(obj).closest('tr').find('td')[2]).find('input').val('');
							$($(obj).closest('tr').find('td')[2]).find('input').val('http://registro.inmetro.gov.br/consulta/detalhe.aspx?pag=1&NumeroRegistro=' + numRegistro);
							$($(obj).closest('tr').find('td')[2]).find('input').hide();
							$($(obj).closest('tr').find('td')[2]).find('input').closest('td').append('<a target="_blank" href="' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '" class="cLink">' + $($(obj).closest('tr').find('td')[2]).find('input').val() + '</a>');
						}
						else {
							$($(obj).closest('tr').find('td')[2]).find('a').remove();
							$($(obj).closest('tr').find('td')[2]).find('input').val('');
							$($(obj).closest('tr').find('td')[2]).find('input').hide();
						}
					}
				}
				break;
		}
	}		
}

//FunÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o para limpar o novo campo de link do registro.
//Demanda: 597309.
//Data: 04/07/2016.
//Desenvolvedor: Igor Becker.
function fCleanVar_linkRegistro() {
    $('inp:linkParaRegistroDeObjeto').val('');
	$($('inp:linkParaRegistroDeObjeto').closest('tr').find('td')[2]).find('a').remove();
}

//FunÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o para alterar a quantidade mÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡xima de caracteres do campo CPF/CNPJ
//Demanda: 1043707.
//Data: 23/07/2019.
//Desenvolvedor: Lucas Dapper.
function Change_Mask(TipoDoc) {
    
	$('inp:cnpj').val("");
	
	if (TipoDoc.value == 'CNPJ'){
		ControlFields($('inp:cnpj'), 'attr', 'maxlength', 14, 0);
		ControlFields($('inp:cnpj'), 'attr', 'minlength', 14, 0);
	} else {
		ControlFields($('inp:cnpj'), 'attr', 'maxlength', 11, 0);
		ControlFields($('inp:cnpj'), 'attr', 'minlength', 11, 0);
	}
	
}

//Esta funÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o realiza o controle para bloquear/liberar a ediÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o campos dor formulÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡rio, como tambÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â©m desabilita a obrigaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de preenchimento do campo.
// id => Localizador do agrupamento
// TypeDefinition => FunÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o de atribuiÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o a ser utilizada (ex: 'attr' ou 'css')
// Type => Tipo do parÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢metro (ex: 'readonly' ou 'pointer-events')
// Value => O valor do parÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢mtro (Ex: false, true, 'none')
// control => Controle: '1' para desabilitar a obrigatoriedade dos campos e '2' para exigir o preenchimento caso configurado no formulÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡rio
// Exemplo de chamada da funÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o => ControlFields($('#OrganizaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o').find('input'), 'attr', 'readonly', true, 1);
//Data: 23/07/2019.
//Desenvolvedor: Lucas Dapper.
function ControlFields(id,TypeDefinition, Type, Value, control){
	//ex: id['attr']('readonly', true);
	id[TypeDefinition](Type, Value);
	
	id.each(function() {
		var field = this;
		  
		if(control == 1){
			//Salvar a informaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o se o campo ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â© obrigatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio ou nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o em uma variÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡vel
			if (field.getAttribute("xrequired") === null) {
					field.setAttribute("xrequired", field.getAttribute("required"));
			}	
			// Marcar o campo como nÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o obrigatÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â³rio
			field.setAttribute("required", "N");
		}
		if(control == 2){
			if(field.getAttribute("xrequired") !== null){
				  if(field.getAttribute("xrequired") != "S"){
						   field.setAttribute("required", "N");
				  }else{
						  field.setAttribute("required", "S");
				  }
			}
		}
	});
}

// Inicio FunÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes adcionadas pelo P111 2057680
function showHideTblSolicitacaoNumeroRegistro() {
  if (document.querySelector('[xname="inpsolicitacaoTipoImportacao"]').value == "14" || document.querySelector('[xname="inpsolicitacaoTipoImportacao"]').value == "15"){
    document.getElementById("tblSolicitacaoNumeroRegistro").style.display = '';
    document.getElementById("alertaCNPJ").style.display = '';	
  } else {
    document.getElementById("tblSolicitacaoNumeroRegistro").style.display = "none";
    document.getElementById("alertaCNPJ").style.display = 'none';
  }
};
	
function maxFiveElementsTblSolicitacaoNumeroRegistro() {
  var linhas = document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByTagName("tr").length;
  if (linhas <= 5) { 
	if(document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv").length>0){
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv").BtnInsertNewRow.style.display = "";
	}
  } else {
	if(document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv").length>0){
		document.querySelector('[id="tblSolicitacaoNumeroRegistro"]').getElementsByClassName("btn btn-mini btn-insert-mv").BtnInsertNewRow.style.display = "none";
	}
  }
};

function alertaCnpj()
{  
	if(document.querySelector('[xname="inptipoDocumento"]').value == 'CNPJ' && document.querySelector('[xname="inpcnpj"]').value.length < 14 && (document.querySelector('[xname="inpsolicitacaoTipoImportacao"]').value == "14" || document.querySelector('[xname="inpsolicitacaoTipoImportacao"]').value == "15"))
	{
		document.getElementById("alertaCNPJ").style.display = '';
        document.querySelector('[xname="inpsolicitacaoNumeroRegistro"]').readOnly = true;
	}
	else
	{
		document.getElementById("alertaCNPJ").style.display = 'none';
      	document.querySelector('[xname="inpsolicitacaoNumeroRegistro"]').readOnly = false;
	}
};

function validarRegistro(obj){
	var exibirAlerta = true;
	if(obj.value.length > 10)
	{
		$.ajax({
				type: 'GET',
				url: '../applications/proxyObterRegistro.aspx?' + obj.value,
				async: false,
				contentType: "application/json",
				dataType: 'json',
				success: function (json) {
					var errors = json.errors;
					if(errors)
					{
						return;
					}
					
					var cnpjRegistro = json.cnpjCertificado;
					if(cnpjRegistro)
					{	
						if(json.cnpjCertificado.replace('.','').replace('.','').replace('/','').replace('-','') == $('inp:cnpj').val())
						{
							exibirAlerta = false;
						}
					}
					for(i=0; i < json.cnpjsAutorizadosImportar.length; i++)
					{
						if(json.cnpjsAutorizadosImportar[i].cnpj.replace('.','').replace('.','').replace('/','').replace('-','') == $('inp:cnpj').val())
						{
							exibirAlerta = false;
						}
					}
					
				},
				error: function (e) {
					return;
				}
			}
		);
	}
	
	if(exibirAlerta)
	{
		var alertas = $(obj).closest('td').find('p');
		$(obj).closest('td').find('p').remove();
		var mensagemAlerta = "O registro de numero " + obj.value + "  n\u00e3o esta autorizado para o CNPJ " + document.querySelector('[xname="inpcnpj"]').value + ".";
		$(obj).closest('td').append('<p class="pAlertaCnpj" style="color:red;font-size:10pt;">'+ mensagemAlerta +'</p>');				
	}
	else		
	{
		$(obj).closest('td').find('p').remove();
	}		
};

function validaTabelaRegistros()
{
	var registros = $('inp:solicitacaoNumeroRegistro');
	for(i=0; i < registros.length; i++)
	{
		if (registros[i].value == '' || registros[i].value.length < 11) 
		{
			$($(registros[i]).closest('tr').find('td')[2]).find('a').remove();
			$(registros[i]).closest('td').find('p').remove();
		}
	}
}
function limpaTabelaRegistros()
{
	var registros = $('inp:solicitacaoNumeroRegistro');
	for(i=0; i < registros.length; i++)
	{
		$(registros[i]).val('');		
	}
	validaTabelaRegistros();
}

function validaRegistrosIncorretos()
{
	var alertasRegistro = document.getElementsByClassName('pAlertaCnpj');
	
	if(alertasRegistro.length > 0)
	{
		var mensagemAlerta = "Existem registros que n\u00e3o podem ser utilizados pelo CNPJ informado. Verifique para poder serguir com a solicita\u00e7\u00e3o.";
          alert(mensagemAlerta);
          return true;
	}
	return false;
}
function recarregaCnpj()
{
	$('inp:cnpj').trigger('change');
};	
// fim funÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes adcionadas pelo P111 2057680
//Inicio Customizacao Certificado produto
function tblCertProdInsertNewRow(){
    let tblcertProd=document.querySelector('#tblcertprod');
    let btn = tblcertProd.querySelector('tr[class=header] #BtnInsertNewRow');
    let canInsertNewRow=true;
    
    if(tblcertProd.querySelectorAll('tbody > tr:not([class=header])').length>=5)
        canInsertNewRow=false;    
    else
        canInsertNewRow=true;                            

        if(btn)
            tblcertProd.querySelector('tr[class=header] #BtnInsertNewRow').disabled = !canInsertNewRow;
}


function hideTblCertProd(){

    let tblcertProd=document.querySelector('#tblcertprod');
    tblcertProd.removeEventListener('DOMSubtreeModified',tblCertProdInsertNewRow);
    let linesToRemove = tblcertProd.querySelectorAll('tbody > tr:not([class=header])');    

    for (i=(linesToRemove.length-1); i>0; i--){

        let btn = linesToRemove[i].querySelector('td button');
        
        if(btn)
            btn.click();
    }  

    linesToRemove[0].querySelectorAll('input').forEach(i=>i.value='');    
    tblcertProd.style.display='none';
    
    let numCertificado = document.querySelector('[xname=inpsolicitacaoNumeroCertificado]');
    numCertificado.setAttribute('required','N');         
    document.querySelector('[xname=inplinkProcert]').setAttribute('required','N');
}

function showTblCertProd(){
    let tblcertProd=document.querySelector('#tblcertprod');
    tblcertProd.addEventListener('DOMSubtreeModified',tblCertProdInsertNewRow);
    tblcertProd.style.display='table';
    let numCertificado = document.querySelector('[xname=inpsolicitacaoNumeroCertificado]');
    numCertificado.setAttribute('required','S');    
    document.querySelector('[xname=inplinkProcert]').setAttribute('required','S');
}

async function GetCertLink(){

    let result = [];
    let cnpj = document.querySelector('[xname=inpvarcnpjsolicitantep065]').value;

    if(cnpj==null || cnpj =='')
        return result;
     
    let url = `../applications/proxy.aspx?http://ws-prodcert.inmetro.gov.br/Certificado.svc/REST/ObterCertificadosPorCertificador/?situacao=Ativo&cpfCnpj=${cnpj}`    

    let response = await fetch(url);
    let json = await response.json();

    if(json.Message == undefined){            
        for(var i = 0; i < json.length; i++){
                let item = { cert: json[i].Numero, address: encodeURI(json[i].Endereco)}
                result.push(item);
            }                
    }    
    
    return result;
}

async function fillProcertField(e)
{
    let certId = e.value;
    let linkProcertField = e.closest('tr').querySelector('[xname=inplinkProcert]');
    
    if(listCertsByCnpj.length==0){
        linkProcertField.before(fieldLoader);
        listCertsByCnpj = await GetCertLink();
        fieldLoader.remove();
    }        

    let result = listCertsByCnpj.filter(i=>i.cert.toLowerCase()==certId.toLowerCase()); 

    if(result.length >0){
        linkProcertField.value=result[0].address;        
    }    
}

function showOrHideTblCerProd(){
    if($("inp:solicitacaoTipoImportacao").val() == '2'){                
        showTblCertProd();
    }else{             
        hideTblCertProd();
    }
}