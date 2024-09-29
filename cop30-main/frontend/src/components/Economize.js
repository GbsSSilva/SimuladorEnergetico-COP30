import React from 'react'

import "./Economize.css"

const Economize = () => {
  return (
    <div>
        <section id="servicos">
            <h2 class="section-title">Como economizar energia?</h2>
            <h3 class="section-subtitle">Pequenas ações, grandes economias de energia!</h3>
            
            <div id="services">
                <div class="services">
                    

                    <img src="/luz-natural.jpeg" class="serv-more" alt="Energia Solar"/>

                    <h3 class="serv-title">Aproveite a luz natural</h3>

                    <span class="serv-description">   
                    Abra as cortinas e janelas durante o dia para iluminar seus ambientes e reduzir a necessidade de lâmpadas.
                    </span>

                    
                </div>
                <div class="services">
                    

                    <img src="/led.jpeg" class="serv-more" alt="Manutenção de Nobreak"/>

                    <h3 class="serv-title">Opte por lâmpadas LED</h3>

                    <span class="serv-description">
                    Elas consomem menos energia e duram mais que as lâmpadas incandescentes e fluorescentes.
                    </span>

                   
                </div>
                <div class="services">
                    

                    <img src="/desligando.jpeg" class="serv-more" alt="Câmera de segurança"/>

                    <h3 class="serv-title">Desligue os aparelhos</h3>

                    <span class="serv-description">
                    Ao invés de deixá-los em stand-by, desligue completamente os aparelhos quando não estiver usando.
                    </span>

                    
                </div>
                
            </div>

            <div id="services2">
                <div class="services">
                    

                    <img src="/ar-condicionado.jpeg" class="serv-more" alt="Redes de computadores"/>

                    <h3 class="serv-title">Ar condicionado</h3>

                    <span class="serv-description">
                    Mantenha o ar condicionado entre 23°C e 25°C. Isso não apenas economiza energia, mas também reduz o desgaste do aparelho.
                    </span>

                   
                </div>
                <div class="services">
                    

                    <img src="/procel.jpeg" class="serv-more" alt="Manutenção de notebook"/>

                    <h3 class="serv-title">Eletrodomésticos eficientes</h3>

                    <span class="serv-description">
                    Escolha aparelhos com selo de eficiência energética (como o selo Procel no Brasil), que consomem menos energia e ajudam a reduzir suas contas.
                    </span>

                    
                </div>
                <div class="services">
                    

                    <img src="/solar.jpeg" class="serv-more" alt="Infraestrutura elétrica"/>

                    <h3 class="serv-title">Use energia solar</h3>

                    <span class="serv-description">
                    Considere instalar painéis solares em sua casa. Essa é uma fonte de energia renovável que pode reduzir significativamente suas contas de energia a longo prazo.
                    </span>

                    
                </div>
            </div>

        </section>
    </div>
  )
}

export default Economize